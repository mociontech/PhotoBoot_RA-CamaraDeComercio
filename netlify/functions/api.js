const Replicate = require("replicate");

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN || "";
const DATAHUB_BASE_URL = (process.env.VITE_DATAHUB_URL || process.env.DATAHUB_URL || "").replace(/\/+$/, "");
const DATAHUB_EVENT_ID = process.env.DATAHUB_EVENT_ID || "";
const DATAHUB_EXPERIENCE_ID = process.env.DATAHUB_EXPERIENCE_ID || "";
const DATAHUB_SOURCE = process.env.DATAHUB_SOURCE || "datahub";
const DATAHUB_API_KEY = process.env.DATAHUB_API_KEY || "";
const DEBUG_LOG_LIMIT = 120;
const GEMINI_REPLICATE_MODEL =
  "google/gemini-2.5-flash-image:445b89a5b905554df77db7eb582bcbe52fa3245d2a1aef63dd38f23d8f92aed2";

const debugLogs = [];
let nextDebugLogId = 1;
let replicate = null;

function getReplicateClient() {
  if (!replicate) {
    replicate = new Replicate({ auth: REPLICATE_API_TOKEN });
  }
  return replicate;
}

function baseHeaders(extra = {}) {
  return {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...extra,
  };
}

function json(statusCode, payload, extraHeaders = {}) {
  return {
    statusCode,
    headers: baseHeaders(extraHeaders),
    body: JSON.stringify(payload),
  };
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
    Object.entries(value)
      .slice(0, 20)
      .forEach(([key, entryValue]) => {
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
  if (!DATAHUB_BASE_URL) return "Falta VITE_DATAHUB_URL en Netlify";
  if (!DATAHUB_EVENT_ID) return "Falta DATAHUB_EVENT_ID en Netlify";
  if (!DATAHUB_API_KEY) return "Falta DATAHUB_API_KEY en Netlify";
  if (needsExperienceId && !DATAHUB_EXPERIENCE_ID) return "Falta DATAHUB_EXPERIENCE_ID en Netlify";
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

function parseBody(event) {
  if (!event.body) return {};
  const body = event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
  return JSON.parse(body);
}

function getRequestPath(event) {
  const fromRawUrl = event.rawUrl ? new URL(event.rawUrl).pathname : "";
  const candidate = fromRawUrl || event.path || "/";
  if (candidate.startsWith("/api/") || candidate === "/api") return candidate;
  if (candidate.startsWith("/.netlify/functions/api/")) {
    return `/api${candidate.slice("/.netlify/functions/api".length)}`;
  }
  if (candidate === "/.netlify/functions/api") return "/api";
  return candidate;
}

async function handleHealth() {
  const ok = REPLICATE_API_TOKEN.length > 0 && REPLICATE_API_TOKEN.startsWith("r8_");
  return json(200, {
    status: "ok",
    token_configured: ok,
    datahub: getDatahubStatus(),
  });
}

async function handleDebugLogs(event) {
  const parsedLimit = Number.parseInt(String(event.queryStringParameters?.limit || DEBUG_LOG_LIMIT), 10);
  const limit = Number.isFinite(parsedLimit) ? Math.max(1, Math.min(parsedLimit, DEBUG_LOG_LIMIT)) : DEBUG_LOG_LIMIT;
  return json(200, {
    logs: debugLogs.slice(0, limit),
    total: debugLogs.length,
  });
}

async function handleAttendees(event) {
  const body = parseBody(event);
  const participant = body?.participant || {};
  const meta = body?.meta || {};
  const configError = ensureDatahubConfig();

  addDebugLog("attendees", "Payload recibido del frontend", { participant, meta });

  if (configError) return json(400, { error: configError });
  if (!participant.name || !participant.email) {
    return json(400, { error: "Nombre y correo son obligatorios para attendees" });
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
    return json(datahubResponse.status, {
      success: datahubResponse.ok,
      request: sanitizeLogData(payload),
      datahub: datahubResponse.body,
    });
  } catch (err) {
    return json(500, { error: err.message });
  }
}

async function handleExperiences(event) {
  const body = parseBody(event);
  const participant = body?.participant || {};
  const metrics = body?.metrics || {};
  const configError = ensureDatahubConfig({ needsExperienceId: true });

  addDebugLog("experiences", "Payload recibido del frontend", { participant, metrics });

  if (configError) return json(400, { error: configError });
  if (!participant.email) return json(400, { error: "El correo es obligatorio para experiences" });

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
    return json(datahubResponse.status, {
      success: datahubResponse.ok,
      request: sanitizeLogData(payload),
      datahub: datahubResponse.body,
    });
  } catch (err) {
    return json(500, { error: err.message });
  }
}

async function handleGenerate(event) {
  try {
    const body = parseBody(event);
    const photo = body?.photo;
    if (!photo) return json(400, { error: "No se envio foto" });
    if (!REPLICATE_API_TOKEN || !REPLICATE_API_TOKEN.startsWith("r8_")) {
      return json(400, { error: "Token no configurado" });
    }

    addDebugLog("generate", "Generando personaje con Gemini (Replicate)", {
      hasPhoto: Boolean(photo),
    });

    const mainPrompt =
      "Edit the provided photo of this exact person. " +
      "Identity preservation is the highest priority, more important than stylization. " +
      "Preserve identity with very high fidelity: match the same face shape, hairstyle, hairline, eyebrow shape, eye spacing, nose shape, mouth shape, lips, jawline, ears, skin tone, glasses if present, facial hair if present, age range, expression, pose, body proportions, camera angle and framing. " +
      "The result must still clearly look like the same person at first glance, not a generic attractive substitute. " +
      "Transform only the person into a polished stylized 3D animated portrait with the look of a premium family animated feature film. " +
      "Keep the style cinematic, warm, appealing and highly finished, with clean 3D modeling, smooth materials, soft global illumination, subtle subsurface scattering in skin, refined hair grooming and expressive but believable facial stylization. " +
      "Preserve the exact identity while translating the person into stylized 3D animation: the same face shape, hairline, hairstyle, eyebrows, eye spacing, nose, mouth, jawline, ears, facial hair, smile, age range, skin tone and overall likeness must remain clearly recognizable. " +
      "Match the clarity of a premium close-up animated portrait: very sharp eyes, eyebrows, nose bridge, lips, teeth when visible, ears, jawline and hairline, with no haze, no softness and no muddy shading. " +
      "Make the final result look high-definition and production-quality: clean silhouettes, strong micro-contrast in the face, precise facial features, crisp hands, smooth but controlled shading, stable color rendering and a consistent premium poster-like finish every time. " +
      "Consistency is critical: even if the source photo is slightly farther from the camera, preserve the same perceived sharpness, the same facial readability, and the same refined 3D animated finish instead of switching to a blurrier or simpler style. " +
      "Prioritize face clarity over fabric texture. The face must read clearly even at a small poster size and should look sharper than the jersey. " +
      "Allocate the highest level of detail to the face: eyes, eyelids, eyebrows, nose bridge, nostrils, lips, teeth when visible, cheekbones, jawline and beard shadow if present. " +
      "If the face is smaller in the source photo, intelligently enhance and reconstruct facial detail while preserving exact identity; do not respond by making the face blurrier, flatter, or more generic. " +
      "Hands must also be crisp and readable, with clean finger separation, defined knuckles and stable proportions when visible. " +
      "Keep the torso, shoulders and hands logically visible, but they must be secondary to the face. The jersey can be simpler and less detailed than the facial features. " +
      "If hands or gestures are visible, preserve them, but do not let the hands dominate the image or steal detail from the face. " +
      "The face should receive more detail and more nuanced shading than any other part of the subject. " +
      "Use nuanced but controlled shading and preserve recognizable likeness in the eyes, smile, glasses, beard stubble, nose bridge, mouth width and hair silhouette when those features exist in the photo. " +
      "Use a rich cinematic palette: nuanced skin tones, clean highlights, refined shadows and clear separation between facial planes. " +
      "Do not beautify, idealize, simplify or redesign the face. Keep the same imperfections, proportions and distinctive facial structure from the source photo. " +
      "Compose the result as a balanced upper-body portrait from upper chest upward, not a long-torso shot. The face should be prominent but still proportional to the shoulders and torso. " +
      "Keep anatomically realistic proportions: the head must not look oversized compared with the shoulders, chest or neck. Avoid bobblehead proportions. " +
      "Show enough shoulders and upper chest to make the torso feel solid and natural. Do not show the waist, hips, full torso or large empty shirt area. Avoid tiny face and long body composition. " +
      "Dress the person in a generic football jersey using Colombia flag colors: vivid yellow shirt, navy blue collar and sleeve trim, subtle red accents, plain fabric, plain shoulders, and no shoulder stripes. " +
      "Do not include any brand logo, sports logo, adidas-style mark, nike-style mark, puma-style mark, abstract chest symbol, three stripes, crest, federation shield, badge, sponsor or trademarked symbol. " +
      "The shirt must look plain and unbranded at first glance: the only chest element allowed is one very small simple rectangular Colombia flag patch. " +
      "On the chest, use only a very small simple rectangular Colombia flag patch, clearly rectangular and never circular, made only of horizontal yellow, blue and red stripes with no text, no border and no emblem. " +
      "Keep the head and shoulders centered in frame. Show only enough chest area to read the shirt design and the small flag patch. " +
      "CRITICAL FRAMING REQUIREMENT: do not crop the subject. Keep the full visible torso, both arms, shoulders, elbows and hands from the source photo whenever they are present. " +
      "Even if the original photo is wider or more open, preserve that full visible body area instead of zooming in to a tight bust crop. " +
      "If a hand gesture is visible, keep the complete gesture with all fingers readable and fully inside the frame. " +
      "The subject should still occupy most of the canvas height while keeping the full visible torso and arms, so the final character reads large and detailed in the poster. " +
      "Do not invent props or gestures; preserve the original pose from the source photo. " +
      "Remove the original background completely and replace it with a flat, uniform, solid chroma key background in pure magenta #FF00FF. " +
      "The magenta background must be perfectly clean edge to edge with no gradients, shadows, reflections or extra elements. " +
      "Output only the isolated pixel art person on the pure magenta background.";

    const negPrompt =
      "photorealistic render, gritty realism, rough painterly illustration, soft airbrush shading, blur, soft focus, haze, muddy rendering, heavy noise, low-detail face, low-detail eyes, low-detail mouth, low-detail hands, soft edges, fuzzy outline, weak contrast, low micro-contrast, muddy shading, washed shading, tiny face, blurry face when far away, simplified face when far away, long torso, too much shirt, too much empty chest area, full body, waist-up distant shot, over-detailed jersey, over-detailed hands, face less detailed than torso, generic facial features, flat lighting, harsh uncanny realism, lifeless skin, dead eyes, oversized head, bobblehead, narrow shoulders, tiny torso, long neck, cropped arms, cropped hands, cropped fingers, cropped shoulders, cut off elbows, cut off wrists, side-cropped body, clipped gesture, tight bust crop, missing torso, " +
      "caricature, chibi, exaggerated head, anime style, low-budget cartoon style, toy-like proportions, generic face, face drift, identity drift, " +
      "distorted face, asymmetrical eyes, wrong glasses, missing glasses, altered hairstyle, altered hair color, missing facial hair, wrong facial hair, extra fingers, extra limbs, cropped body, multiple people, " +
      "black shirt, green shirt, plain casual hoodie, wrong jersey, no jersey, non-colombia jersey, brand logo, adidas logo, adidas-style logo, nike logo, puma logo, three stripes, shoulder stripes, sportswear logo, crest, shield, emblem, badge, sponsor logo, trademark symbol, abstract chest symbol, chest icon, circular patch, circular badge, round crest, federation emblem, " +
      "stadium, crowd, field, grass, sky, banners, ads, text, watermark, typography, logos, frame, soccer ball, props, accessories, hat, cap, hood, " +
      "gradient background, patterned background, shadows on background, non-magenta background, blurry outline, washed colors, different pose, different expression, different person";

    const prompt = `${mainPrompt}\n\nAvoid: ${negPrompt}`;
    const output = await getReplicateClient().run(GEMINI_REPLICATE_MODEL, {
      input: {
        prompt,
        image_input: [photo],
        aspect_ratio: "9:16",
        output_format: "png",
      },
    });

    const imageUrl = Array.isArray(output) ? output[0] : output?.url || String(output);

    addDebugLog("generate", "Imagen generada correctamente", {
      model: GEMINI_REPLICATE_MODEL,
      imageUrl,
    });
    return json(200, { success: true, imageUrl, model: GEMINI_REPLICATE_MODEL });
  } catch (err) {
    addDebugLog("generate", "Error generando imagen", { error: err.message });
    return json(500, { error: err.message });
  }
}

exports.handler = async event => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET,POST,OPTIONS",
        "access-control-allow-headers": "content-type,authorization",
      },
      body: "",
    };
  }

  const method = String(event.httpMethod || "GET").toUpperCase();
  const path = getRequestPath(event);

  try {
    if (method === "GET" && path === "/api/health") return await handleHealth();
    if (method === "GET" && path === "/api/debug/logs") return await handleDebugLogs(event);
    if (method === "POST" && path === "/api/datahub/attendees") return await handleAttendees(event);
    if (method === "POST" && path === "/api/datahub/experiences") return await handleExperiences(event);
    if (method === "POST" && path === "/api/generate") return await handleGenerate(event);
    return json(404, { error: "Not found", path, method });
  } catch (err) {
    addDebugLog("system", "Error no controlado en Netlify Function", {
      error: err.message,
      path,
      method,
    });
    return json(500, { error: err.message });
  }
};
