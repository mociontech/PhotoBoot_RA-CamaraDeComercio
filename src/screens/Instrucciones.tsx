import { useNavigate } from 'react-router-dom'

const imgPolygon1 = 'https://www.figma.com/api/mcp/asset/d1c49546-7b4c-4a9b-9885-ef553d462801'
const imgPolygon2 = 'https://www.figma.com/api/mcp/asset/e282f0e7-b5e2-47e8-a28f-366bc5a87f68'
const imgLogoGroup = 'https://www.figma.com/api/mcp/asset/a4411449-fe99-46cf-b6cd-05e93ae7e080'
const imgLogoText = 'https://www.figma.com/api/mcp/asset/d93bbfd8-3080-4c21-b09e-53f25ed83caa'

export default function Instrucciones() {
  const navigate = useNavigate()

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#6fcfea' }}
    >
      {/* Decorative polygons */}
      <div
        style={{
          position: 'absolute',
          left: '-336px',
          top: '-1031px',
          width: '1283px',
          height: '1268px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ transform: 'rotate(-4.29deg)', flexShrink: 0 }}>
          <img alt="" src={imgPolygon1} style={{ width: '1198px', height: '1181px', display: 'block' }} />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '421px',
          top: '-999px',
          width: '1569px',
          height: '1569px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ transform: 'rotate(26.96deg)', flexShrink: 0 }}>
          <img alt="" src={imgPolygon2} style={{ width: '1167px', height: '1167px', display: 'block' }} />
        </div>
      </div>

      {/* Logo */}
      <div style={{ position: 'absolute', left: '99px', top: '94px', height: '43px', width: '147px' }}>
        <img alt="Mocion" src={imgLogoGroup} style={{ height: '100%', width: 'auto', display: 'block' }} />
        <img alt="" src={imgLogoText} style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 'auto', display: 'block' }} />
      </div>

      {/* Mocion brand text */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: '220px', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: '"Nunito", "Proxima Nova", sans-serif',
            fontWeight: 800,
            fontSize: '110px',
            lineHeight: '100px',
            color: '#232e2e',
          }}
        >
          Mocion
        </div>
        <div
          style={{
            fontFamily: '"Nunito", "Proxima Nova", sans-serif',
            fontWeight: 400,
            fontSize: '48px',
            color: '#232e2e',
            marginTop: '10px',
          }}
        >
          Experience Tech
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '522px',
          textAlign: 'center',
          fontFamily: '"Bungee", sans-serif',
          fontSize: '92px',
          lineHeight: '90px',
          color: '#232e2e',
        }}
      >
        Instrucciones
      </div>

      {/* Instructions list */}
      <ol
        style={{
          position: 'absolute',
          left: '103px',
          top: '740px',
          width: '844px',
          fontFamily: '"Roboto", sans-serif',
          fontSize: '40px',
          lineHeight: '50px',
          color: '#232e2e',
          paddingLeft: '60px',
          margin: 0,
        }}
      >
        <li style={{ marginBottom: '16px' }}>
          <strong>Selecciona el fondo:</strong>{' '}
          Elige el color de fondo que más te guste para tu foto.
        </li>
        <li style={{ marginBottom: '16px' }}>
          <strong>Prepárate para la foto:</strong>{' '}
          Mira directamente a la cámara, asegúrate de evitar sombras fuertes y
          de que tu cara esté bien iluminada. Mantente quieto cuando comience la
          cuenta regresiva.
        </li>
        <li style={{ marginBottom: '16px' }}>
          <strong>Generación de imagen:</strong>{' '}
          La IA procesará tu foto, espera unos segundos mientras se genera tu imagen.
        </li>
        <li>
          <strong>Escanea y guarda:</strong>{' '}
          Escanea el código QR para guardar tu foto. ¡Vivamos el Mundial!
        </li>
      </ol>

      {/* Continuar button */}
      <button
        onClick={() => navigate('/seleccion-fondo')}
        style={{
          position: 'absolute',
          left: '112px',
          top: '1456px',
          width: '855px',
          height: '133px',
          background: '#2d2d2d',
          borderRadius: '24px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: '"Roboto", sans-serif',
            fontWeight: 700,
            fontSize: '65px',
            color: '#fff',
          }}
        >
          Continuar
        </span>
      </button>
    </div>
  )
}
