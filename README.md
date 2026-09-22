# Hacienda La Julieta - Photobooth IA

Photobooth para el evento en Hacienda La Julieta. El invitado se registra, elige uno de
3 escenarios reales del venue (Ceremonia, Salón de Eventos, Recepción al Atardecer),
se toma una foto y la IA (OpenAI `gpt-image-1`) lo compone dentro de esa escena
preservando su identidad. Al final descarga su foto escaneando un código QR.

## Requerimientos

- **Node.js** v18+ ([Descargar aquí](https://nodejs.org/))
- **API Key de OpenAI** con acceso a `gpt-image-1` ([Obtener aquí](https://platform.openai.com/api-keys))
- (Opcional) Credenciales de **DataHub** si se quiere registrar asistentes/experiencias

---

## 🚀 Paso a paso para ejecutar (PowerShell / Windows)

### 1. Abre PowerShell y ve a la carpeta del proyecto

```powershell
cd C:\ruta\donde\descargaste\PhotoBoot_RA-CamaraDeComercio
```

### 2. Instala las dependencias

```powershell
npm install
```

### 3. Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto (no se sube al repositorio) con:

```
OPENAI_API_KEY=sk-TU_KEY_AQUI

# Opcional - integracion DataHub
DATAHUB_URL=
DATAHUB_EVENT_ID=
DATAHUB_EXPERIENCE_ID=
DATAHUB_SOURCE=datahub
DATAHUB_API_KEY=
```

### 4. Ejecuta el servidor

```powershell
node server.js
```

Deberías ver:
```
========================================================
  Hacienda La Julieta - Photo Generator - Promologistics
========================================================

  http://localhost:3000

  Token OK

========================================================
```

### 5. Abre en tu navegador (o en el tótem)

```
http://localhost:3000
```

---

## 🖼️ Flujo de pantallas

1. **Inicio** - Bienvenida
2. **Registro** - Nombre, empresa, correo, celular
3. **Instrucciones** - Cómo tomarse la foto
4. **Selección de escenario** - Ceremonia / Salón de Eventos / Recepción al Atardecer
5. **Cámara** - Captura con cuenta regresiva automática
6. **Procesamiento** - La IA compone la foto en el escenario elegido
7. **Resultado** - Muestra la foto final, botón Continuar
8. **Agradecimiento** - QR para descargar la foto

Todas las pantallas están implementadas pixel-perfect a partir del diseño en Figma
(*La Julieta Experience 2026*).

## 📁 Estructura del proyecto

```
PhotoBoot_RA-CamaraDeComercio/
├── package.json          # Dependencias
├── server.js             # Backend (Express + OpenAI Images API + DataHub)
├── .env                  # Variables de entorno (no versionado)
├── README.md             # Este archivo
└── public/
    ├── index.html         # Frontend completo (todas las pantallas)
    ├── figma/              # Assets exportados de Figma (fondos de pantalla, iconos, logo)
    └── Fondos/             # Fotos de referencia de los 3 escenarios usadas por la IA
```

## ⚠️ Notas importantes

- Cada generación consume créditos de la cuenta de OpenAI configurada
- El escenario elegido en la pantalla de selección se envía al backend (`eventType`) y
  determina qué foto de referencia usa la IA para componer la imagen final
- **NUNCA** compartas tu `OPENAI_API_KEY` públicamente ni la subas al repositorio

## 🔧 Troubleshooting

**"Token no configurado"**: revisa que `OPENAI_API_KEY` esté en el `.env` y empiece con `sk-`

**"No se pudo acceder a la cámara"**: asegúrate de usar `http://localhost:3000` (no `file://`). Chrome bloquea la cámara sin localhost o HTTPS.

**"Error del servidor" o timeout**: la generación de imagen puede tardar. Si falla, revisa los logs en `GET /api/debug/logs` o la consola del servidor.

**Puerto 3000 ocupado**: cambia `const PORT = 3000;` en `server.js` por otro puerto.
