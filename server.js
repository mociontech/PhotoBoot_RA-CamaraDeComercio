/**
 * Hacienda La Julieta - Promologistics Photo Generator
 * La IA compone a la persona dentro de una de las escenas del evento.
 */

require("dotenv").config();
const fs = require("fs");
const express = require("express");
const OpenAI = require("openai");
const { toFile } = require("openai/uploads");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const DATAHUB_BASE_URL = (process.env.VITE_DATAHUB_URL || process.env.DATAHUB_URL || "").replace(/\/+$/, "");
const DATAHUB_EVENT_ID = process.env.DATAHUB_EVENT_ID || "";
const DATAHUB_EXPERIENCE_ID = process.env.DATAHUB_EXPERIENCE_ID || "";
const DATAHUB_SOURCE = process.env.DATAHUB_SOURCE || "datahub";
const DATAHUB_API_KEY = process.env.DATAHUB_API_KEY || "";
const DEBUG_LOG_LIMIT = 120;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const IMAGE_MODEL = "gpt-image-1";
const BACKGROUNDS_DIR = path.join(__dirname, "public", "Fondos");
const debugLogs = [];
let nextDebugLogId = 1;

const IDENTITY_PROMPT =
  "You are given two images: the first is a real photo of a real person, the second is a real venue scene at Hacienda La Julieta. " +
  "Your only task is to place this exact person into the venue scene. This is a background replacement, not a face generation task. " +
  "Do not redraw, restyle, beautify, slim, age, de-age or in any way alter the person's face or body. Copy their face pixel-for-pixel in structure: same face shape, same skin tone and texture, same hairstyle and hair color, same hairline, same eyebrows, same eye shape and eye color, same nose, same mouth and lip shape, same jawline, same ears, same glasses if present, same facial hair if present, same expression, same freckles/moles/scars if visible. " +
  "The output must be immediately recognizable as the exact same individual as in the first photo, indistinguishable in identity from a real unedited photo of them, only placed in a new location. " +
  "Keep the person's original pose, body proportions and camera framing from the first photo as much as possible. " +
  "Blend the lighting, color temperature and shadows so the person looks naturally photographed in the venue scene, matching the ambiance of the second image. " +
  "Do not change the venue architecture, decoration or other guests visible in the second image. " +
  "Do not add any text, watermark, logo or UI element. Output a vertical 9:16 portrait.";

const EVENT_TYPES = [
  {
    id: "ceremonia",
    label: "Ceremonia",
    file: "ChatGPT Image 17 sept 2026, 04_14_25 p.m. (1).png",
    prompt:
      IDENTITY_PROMPT +
      " Event context: an elegant outdoor wedding ceremony at dusk, with a stone aisle lined with candles and white flowers, leading to a modern altar. " +
      " Dress the person in elegant formal wedding-guest attire (suit or evening dress) consistent with the other guests, and place them naturally among the aisle or seating area without blocking the couple at the altar.",
  },
  {
    id: "salon",
    label: "Salon de Eventos",
    file: "ChatGPT Image 17 sept 2026, 04_14_25 p.m. (2).png",
    prompt:
      IDENTITY_PROMPT +
      " Event context: an elegant indoor event hall with warm wood ceiling panels, ambient lighting and cocktail tables, set up for a corporate or social gathering. " +
      " Dress the person in elegant business or cocktail attire consistent with the other guests, and place them naturally near one of the cocktail tables or open floor area.",
  },
  {
    id: "recepcion",
    label: "Recepcion al Atardecer",
    file: "ChatGPT Image 17 sept 2026, 04_14_25 p.m. (3).png",
    prompt:
      IDENTITY_PROMPT +
      " Event context: an outdoor terrace reception at golden-hour dusk, with string lights, lounge furniture, lanterns and mountain views in the background. " +
      " Dress the person in elegant evening cocktail attire consistent with the other guests, and place them naturally standing or seated in the terrace area.",
  },
];

function isTokenConfigured() {
  return OPENAI_API_KEY.length > 0 && OPENAI_API_KEY.startsWith("sk-");
}

function listBackgroundFiles() {
  try {
    return fs
      .readdirSync(BACKGROUNDS_DIR)
      .filter(name => /\.(png|jpe?g|webp)$/i.test(name))
      .map(name => path.join(BACKGROUNDS_DIR, name));
  } catch (err) {
    return [];
  }
}

function getEventType(id) {
  return EVENT_TYPES.find(e => e.id === id) || null;
}

function dataUrlToBuffer(dataUrl) {
  const match = /^data:(image\/\w+);base64,(.+)$/.exec(dataUrl);
  if (!match) throw new Error("Formato de foto invalido");
  return Buffer.from(match[2], "base64");
}

function maskToken(token) {
  if (!token) return "";
  if (token.length <= 12) return "***";
  return `${token.slice(0, 6)}...${token.slice(-6)}`;
}

function sanitizeLogData(value, depth = 0) {
  if (value == null) return value;
  if (depth > 4) return "[depth-limit]";
  if (typeof value === "string") {
    if (value.startsWith("data:image/")) return "[base64-image]";
    if (value.length > 280) return `${value.slice(0, 180)}...(${value.length} chars)`;
    return value;
  }
  if (Array.isArray(value)) return value.slice(0, 8).map(item => sanitizeLogData(item, depth + 1));
  if (typeof value === "object") {
    const out = {};
    Object.entries(value).slice(0, 20).forEach(([key, entryValue]) => {
      if (/authorization|token|api[_-]?key/i.test(key)) {
        out[key] = maskToken(String(entryValue || ""));
        return;
      }
      out[key] = sanitizeLogData(entryValue, depth + 1);
    });
    return out;
  }
  return value;
}

function addDebugLog(scope, message, details) {
  const entry = {
    id: nextDebugLogId++,
    timestamp: new Date().toISOString(),
    scope,
    message,
    details: sanitizeLogData(details),
  };
  debugLogs.unshift(entry);
  if (debugLogs.length > DEBUG_LOG_LIMIT) debugLogs.length = DEBUG_LOG_LIMIT;
  console.log(`[${entry.timestamp}] [${scope}] ${message}`);
  if (details !== undefined) console.log(sanitizeLogData(details));
  return entry;
}

function getDatahubStatus() {
  return {
    base_url_configured: Boolean(DATAHUB_BASE_URL),
    event_id_configured: Boolean(DATAHUB_EVENT_ID),
    experience_id_configured: Boolean(DATAHUB_EXPERIENCE_ID),
    api_key_configured: Boolean(DATAHUB_API_KEY),
    source: DATAHUB_SOURCE,
  };
}

function ensureDatahubConfig({ needsExperienceId = false } = {}) {
  if (!DATAHUB_BASE_URL) return "Falta VITE_DATAHUB_URL en .env";
  if (!DATAHUB_EVENT_ID) return "Falta DATAHUB_EVENT_ID en .env";
  if (!DATAHUB_API_KEY) return "Falta DATAHUB_API_KEY en .env";
  if (needsExperienceId && !DATAHUB_EXPERIENCE_ID) return "Falta DATAHUB_EXPERIENCE_ID en .env";
  return "";
}

async function postToDatahub(endpoint, payload, scope) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const url = `${DATAHUB_BASE_URL}/${String(endpoint).replace(/^\/+/, "")}`;

  addDebugLog(scope, "Enviando payload a Datahub", {
    url,
    payload,
    headers: {
      authorization: `Bearer ${maskToken(DATAHUB_API_KEY)}`,
      "content-type": "application/json",
    },
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${DATAHUB_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const raw = await response.text();
    let body;
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch (err) {
      body = { raw };
    }

    addDebugLog(scope, `Respuesta Datahub ${response.status}`, {
      ok: response.ok,
      body,
    });

    return {
      ok: response.ok,
      status: response.status,
      body,
    };
  } catch (err) {
    addDebugLog(scope, "Error enviando a Datahub", {
      url,
      error: err.message,
    });
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    token_configured: isTokenConfigured(),
    backgrounds_available: listBackgroundFiles().length,
    datahub: getDatahubStatus(),
  });
});

app.get("/api/event-types", (req, res) => {
  res.json({
    eventTypes: EVENT_TYPES.map(({ id, label }) => ({ id, label })),
  });
});

app.get("/api/debug/logs", (req, res) => {
  const parsedLimit = Number.parseInt(String(req.query.limit || DEBUG_LOG_LIMIT), 10);
  const limit = Number.isFinite(parsedLimit) ? Math.max(1, Math.min(parsedLimit, DEBUG_LOG_LIMIT)) : DEBUG_LOG_LIMIT;
  res.json({
    logs: debugLogs.slice(0, limit),
    total: debugLogs.length,
  });
});

app.post("/api/datahub/attendees", async (req, res) => {
  const participant = req.body?.participant || {};
  const meta = req.body?.meta || {};
  const configError = ensureDatahubConfig();

  addDebugLog("attendees", "Payload recibido del frontend", { participant, meta });

  if (configError) return res.status(400).json({ error: configError });
  if (!participant.name || !participant.email) {
    return res.status(400).json({ error: "Nombre y correo son obligatorios para attendees" });
  }

  const payload = {
    eventId: DATAHUB_EVENT_ID,
    source: DATAHUB_SOURCE,
    sentAt: new Date().toISOString(),
    records: [
      {
        fullName: participant.name,
        email: participant.email,
        checkInAt: meta.checkInAt || new Date().toISOString(),
      },
    ],
  };

  try {
    const datahubResponse = await postToDatahub("attendees", payload, "attendees");
    res.status(datahubResponse.status).json({
      success: datahubResponse.ok,
      request: sanitizeLogData(payload),
      datahub: datahubResponse.body,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/datahub/experiences", async (req, res) => {
  const participant = req.body?.participant || {};
  const metrics = req.body?.metrics || {};
  const configError = ensureDatahubConfig({ needsExperienceId: true });

  addDebugLog("experiences", "Payload recibido del frontend", { participant, metrics });

  if (configError) return res.status(400).json({ error: configError });
  if (!participant.email) return res.status(400).json({ error: "El correo es obligatorio para experiences" });

  const numericScore = Number.isFinite(Number(metrics.score)) ? Number(metrics.score) : 1;
  const numericBonusScore = Number.isFinite(Number(metrics.bonusScore)) ? Number(metrics.bonusScore) : 0;

  const payload = {
    eventId: DATAHUB_EVENT_ID,
    experienceId: DATAHUB_EXPERIENCE_ID,
    source: DATAHUB_SOURCE,
    sentAt: new Date().toISOString(),
    records: [
      {
        fullName: participant.name || "",
        name: participant.name || "",
        email: participant.email,
        play_timestamp: metrics.playTimestamp || new Date().toISOString(),
        score: numericScore,
        bonusScore: numericBonusScore,
        data: {
          fullName: participant.name || "",
          name: participant.name || "",
          company: participant.company || "",
          phone: participant.phone || "",
          email: participant.email || "",
          level: Number.isFinite(Number(metrics.level)) ? Number(metrics.level) : 1,
          time: Number.isFinite(Number(metrics.time)) ? Number(metrics.time) : 0,
          background: metrics.background || "",
          captureMode: metrics.captureMode || "",
          processingMs: metrics.processingMs ?? null,
          processingStartedAt: metrics.processingStartedAt || null,
          processingEndedAt: metrics.processingEndedAt || null,
          resultReadyAt: metrics.resultReadyAt || null,
          qrOpenedAt: metrics.qrOpenedAt || null,
          fallbackUsed: Boolean(metrics.fallbackUsed),
          posterReady: Boolean(metrics.posterReady),
          posterUploaded: Boolean(metrics.posterUploaded),
          sessionId: metrics.sessionId || "",
          status: metrics.status || "completed",
          sourceLabel: DATAHUB_SOURCE,
        },
      },
    ],
  };

  try {
    const datahubResponse = await postToDatahub("experiences", payload, "experiences");
    res.status(datahubResponse.status).json({
      success: datahubResponse.ok,
      request: sanitizeLogData(payload),
      datahub: datahubResponse.body,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/generate", async (req, res) => {
  try {
    const { photo, eventType } = req.body;
    if (!photo) return res.status(400).json({ error: "No se envio foto" });
    if (!isTokenConfigured()) return res.status(400).json({ error: "Token no configurado" });

    const event = getEventType(eventType) || EVENT_TYPES[0];
    const backgroundPath = path.join(BACKGROUNDS_DIR, event.file);
    if (!fs.existsSync(backgroundPath)) {
      return res.status(500).json({ error: `Fondo no encontrado: ${event.file}` });
    }

    addDebugLog("generate", "Generando composicion con gpt-image-1 (OpenAI)", {
      hasPhoto: Boolean(photo),
      eventType: event.id,
      background: event.file,
    });

    const ext = path.extname(backgroundPath).toLowerCase();
    const backgroundMime = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : ext === ".webp" ? "image/webp" : "image/png";

    const [photoFile, backgroundFile] = await Promise.all([
      toFile(dataUrlToBuffer(photo), "photo.png", { type: "image/png" }),
      toFile(fs.readFileSync(backgroundPath), event.file, { type: backgroundMime }),
    ]);

    const result = await openai.images.edit({
      model: IMAGE_MODEL,
      image: [photoFile, backgroundFile],
      prompt: event.prompt,
      size: "1024x1536",
    });

    const b64 = result.data?.[0]?.b64_json;
    if (!b64) throw new Error("OpenAI no devolvio una imagen");
    const imageUrl = `data:image/png;base64,${b64}`;

    addDebugLog("generate", "Imagen generada correctamente", {
      model: IMAGE_MODEL,
      eventType: event.id,
    });
    res.json({ success: true, imageUrl, model: IMAGE_MODEL, eventType: event.id });
  } catch (err) {
    addDebugLog("generate", "Error generando imagen", { error: err.message });
    res.status(500).json({ error: err.message });
  }
});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.listen(PORT, () => {
  const ok = isTokenConfigured();
  addDebugLog("system", "Servidor iniciado", {
    port: PORT,
    openai_token_configured: ok,
    backgrounds_available: listBackgroundFiles().length,
    datahub: getDatahubStatus(),
  });
  console.log("\n" + "=".repeat(56));
  console.log("  Hacienda La Julieta - Photo Generator - Promologistics");
  console.log("=".repeat(56));
  console.log(`\n  http://localhost:${PORT}`);
  console.log(ok ? "\n  Token OK" : "\n  FALTA TOKEN");
  console.log("\n" + "=".repeat(56) + "\n");
});
