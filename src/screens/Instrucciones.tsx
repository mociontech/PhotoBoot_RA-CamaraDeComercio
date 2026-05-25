import { useNavigate } from 'react-router-dom'

// Assets — Figma node 34:30269
const imgPolygon1  = 'https://www.figma.com/api/mcp/asset/d1c49546-7b4c-4a9b-9885-ef553d462801'
const imgPolygon2  = 'https://www.figma.com/api/mcp/asset/e282f0e7-b5e2-47e8-a28f-366bc5a87f68'
const imgBrandMark = 'https://www.figma.com/api/mcp/asset/a4411449-fe99-46cf-b6cd-05e93ae7e080' // imgGroup — brand mark
const imgBrandText = 'https://www.figma.com/api/mcp/asset/d93bbfd8-3080-4c21-b09e-53f25ed83caa' // imgGroup1 — "Experience Tech"

export default function Instrucciones() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', background: '#6fcfea', overflow: 'hidden' }}>

      {/* Polygon 1 — large, top area, rotated */}
      <div style={{ position: 'absolute', left: '-336px', top: '-1031px', width: '1283px', height: '1268px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ transform: 'rotate(-4.29deg)', flexShrink: 0 }}>
          <img alt="" src={imgPolygon1} style={{ width: '1198px', height: '1182px', display: 'block' }} />
        </div>
      </div>

      {/* Polygon 2 — large, top-right, rotated */}
      <div style={{ position: 'absolute', left: '421px', top: '-999px', width: '1570px', height: '1570px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ transform: 'rotate(26.96deg)', flexShrink: 0 }}>
          <img alt="" src={imgPolygon2} style={{ width: '1167px', height: '1167px', display: 'block' }} />
        </div>
      </div>

      {/* Brand mark — (inset 8.85%/20.28%/83.84%/20.28% → 219,170 642×140) */}
      <img alt="" src={imgBrandMark} style={{ position: 'absolute', left: '219px', top: '170px', width: '642px', height: '140px', display: 'block' }} />

      {/* Brand text "Experience Tech" — (inset 17.32%/20.28%/78.81%/20.28% → 219,333 642×74) */}
      <img alt="" src={imgBrandText} style={{ position: 'absolute', left: '219px', top: '333px', width: '642px', height: '74px', display: 'block' }} />

      {/* Title "Instrucciones" (center 539.5,603.5 h=103 → left=111, top=552) */}
      <div style={{
        position: 'absolute', left: '111px', top: '552px', width: '857px', height: '103px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Bungee", sans-serif', fontSize: '92px', lineHeight: '90px',
        color: '#232e2e', textAlign: 'center',
      }}>
        Instrucciones
      </div>

      {/* Numbered list (left=103, top=740, w=844, h=614) */}
      <ol style={{
        position: 'absolute', left: '103px', top: '740px', width: '844px',
        fontFamily: '"Roboto", sans-serif', fontWeight: 400, fontSize: '40px', lineHeight: '50px',
        color: '#232e2e', paddingLeft: '60px', margin: 0, listStyle: 'decimal',
        boxSizing: 'border-box',
      }}>
        <li style={{ marginBottom: '12px' }}>
          <span style={{ fontWeight: 800 }}>Selecciona el fondo:</span>
          {' Elige el color de fondo que más te guste para tu foto.'}
        </li>
        <li style={{ marginBottom: '12px' }}>
          <span style={{ fontWeight: 800 }}>Prepárate para la foto:</span>
          {' Mira directamente a la cámara, asegúrate de evitar sombras fuertes y de que tu cara esté bien iluminada. Mantente quieto cuando comience la cuenta regresiva.'}
        </li>
        <li style={{ marginBottom: '12px' }}>
          <span style={{ fontWeight: 800 }}>Generación de imagen:</span>
          {' La IA procesará tu foto, espera unos segundos mientras se genera tu imagen.'}
        </li>
        <li>
          <span style={{ fontWeight: 800 }}>Escanea y guarda:</span>
          {' Escanea el código QR para guardar tu foto. ¡Vivamos el Mundial!'}
        </li>
      </ol>

      {/* Continuar button (center 540.5 → left=113, top=1456, w=855, h=133) */}
      <button
        onClick={() => navigate('/seleccion-fondo')}
        style={{
          position: 'absolute', left: '113px', top: '1456px', width: '855px', height: '133px',
          background: '#2d2d2d', borderRadius: '24px', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 700, fontSize: '65px', color: '#fff', lineHeight: 1 }}>
          Continuar
        </span>
      </button>
    </div>
  )
}
