import { useNavigate } from 'react-router-dom'

const imgFutbolista = 'https://www.figma.com/api/mcp/asset/e65950f0-7d45-4216-a8ad-d4407f12d07b'
const imgPolygon = 'https://www.figma.com/api/mcp/asset/1f8ffc9c-6580-4734-b913-1fc3b154d30e'
const imgLogoGroup = 'https://www.figma.com/api/mcp/asset/8659061d-bdd9-4805-902d-42731b088ee4'
const imgLogoText = 'https://www.figma.com/api/mcp/asset/455cd40f-de5b-4029-a5c1-167612dccfca'

export default function Inicio() {
  const navigate = useNavigate()

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#82ea6f' }}
    >
      {/* Decorative polygon background */}
      <div
        className="absolute"
        style={{
          left: '-367px',
          top: '633px',
          width: '1982px',
          height: '1982px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ transform: 'rotate(8.9deg)', flexShrink: 0 }}>
          <img
            alt=""
            src={imgPolygon}
            style={{ width: '1735px', height: '1735px', display: 'block' }}
          />
        </div>
      </div>

      {/* Soccer player photo */}
      <img
        alt=""
        src={imgFutbolista}
        style={{
          position: 'absolute',
          left: '-104px',
          top: '93px',
          width: '1219px',
          height: '997px',
          objectFit: 'cover',
          objectPosition: 'bottom',
          pointerEvents: 'none',
        }}
      />

      {/* Logo */}
      <div style={{ position: 'absolute', left: '99px', top: '94px', height: '43px', width: '147px' }}>
        <img alt="Mocion logo icon" src={imgLogoGroup} style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 'auto', display: 'block' }} />
        <img alt="Mocion logo text" src={imgLogoText} style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 'auto', display: 'block' }} />
      </div>

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          left: '112px',
          top: '1060px',
          width: '857px',
          fontFamily: '"Bungee", sans-serif',
          fontSize: '80px',
          lineHeight: '90px',
          color: '#232e2e',
          fontStyle: 'normal',
        }}
      >
        <p style={{ margin: 0 }}>Bienvenido al</p>
        <p style={{ margin: 0 }}>Photobooth IA</p>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          left: '112px',
          top: '1270px',
          width: '848px',
          fontFamily: '"Roboto", sans-serif',
          fontSize: '50px',
          lineHeight: '55px',
          color: '#232e2e',
        }}
      >
        <p style={{ margin: 0 }}>
          {'En la ruta al '}
          <strong>Mundial 2026</strong>
          {' también hay paradas para la foto. '}
          <strong>Tómate la tuya y súmate al equipo.</strong>
        </p>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => navigate('/registro')}
        style={{
          position: 'absolute',
          left: '99px',
          top: '1581px',
          width: '882px',
          height: '133px',
          background: '#232e2e',
          borderRadius: '66.5px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: '"Nunito", "Proxima Nova", sans-serif',
            fontWeight: 800,
            fontSize: '65px',
            color: '#fff',
            letterSpacing: '0',
          }}
        >
          Iniciar
        </span>
      </button>
    </div>
  )
}
