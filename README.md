# ⚽ FIFA 2026 - Promologistics Photo Generator

Tómate una selfie con un contador 3-2-1 y la IA te transforma en hincha
de la selección mexicana en un estadio brandeado con Promologistics.

## Requerimientos

- **Node.js** v18+ ([Descargar aquí](https://nodejs.org/))
- **Token de Replicate** ([Obtener aquí](https://replicate.com/account/api-tokens))

---

## 🚀 Paso a paso para ejecutar (PowerShell / Windows)

### 1. Abre PowerShell y ve a la carpeta del proyecto

```powershell
cd C:\ruta\donde\descargaste\fifa2026-app
```

### 2. Instala las dependencias

```powershell
npm install
```

### 3. Configura tu token de Replicate

**Opción A** - Variable de entorno (recomendado):
```powershell
$env:REPLICATE_API_TOKEN="r8_TU_TOKEN_AQUI"
```

**Opción B** - Editar directamente en server.js:
Abre `server.js` y cambia la línea:
```js
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN || "TU_TOKEN_AQUI";
```
Por:
```js
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN || "r8_TU_TOKEN_REAL";
```

### 4. Ejecuta el servidor

```powershell
node server.js
```

Deberías ver:
```
========================================================
  ⚽  FIFA 2026 - Promologistics Photo Generator
========================================================

  🌐  Abre en tu navegador: http://localhost:3000

  ✅  Token de Replicate configurado

  Presiona Ctrl+C para detener el servidor
========================================================
```

### 5. Abre en tu navegador

```
http://localhost:3000
```

### 6. ¡Listo! Tómate la foto

1. Dale permiso a la cámara
2. Presiona **"TOMAR FOTO (3...2...1)"**
3. Espera 30-90 segundos mientras la IA genera
4. Descarga tu imagen

---

## 📁 Estructura del proyecto

```
fifa2026-app/
├── package.json          # Dependencias
├── server.js             # Backend (Express + Replicate API)
├── README.md             # Este archivo
└── public/
    └── index.html        # Frontend completo
```

## ⚠️ Notas importantes

- La primera generación puede tardar más (el modelo se carga en frío)
- Cada generación consume créditos de tu cuenta Replicate
- Si la API falla, se aplica el marco FIFA 2026 sobre tu foto original como demo
- **NUNCA** compartas tu token públicamente

## 🔧 Troubleshooting

**"Token no configurado"**: Revisa que configuraste bien el token en Paso 3

**"No se pudo acceder a la cámara"**: Asegúrate de usar `http://localhost:3000` (no file://). Chrome bloquea cámara sin localhost o HTTPS.

**"Error del servidor" o timeout**: El modelo puede tardar hasta 90s. Si falla, intenta de nuevo.

**Puerto 3000 ocupado**: Cambia `const PORT = 3000;` en server.js por otro puerto.
