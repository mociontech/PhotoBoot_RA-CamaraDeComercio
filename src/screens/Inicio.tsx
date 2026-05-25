import { useNavigate } from 'react-router-dom'

// Assets — Figma node 34:20246
const imgFutbolista = 'https://www.figma.com/api/mcp/asset/e65950f0-7d45-4216-a8ad-d4407f12d07b'
const imgStar2      = 'https://www.figma.com/api/mcp/asset/be8734ae-a134-4c46-937e-18f9aa716432'
const imgPolygon3   = 'https://www.figma.com/api/mcp/asset/1f8ffc9c-6580-4734-b913-1fc3b154d30e'
const imgStar5      = 'https://www.figma.com/api/mcp/asset/ba3a9a0c-f61d-44bc-a65e-07b6acbb7155'
const imgStar4      = 'https://www.figma.com/api/mcp/asset/9c592903-0273-4461-bcb1-6130185548f1'
const imgLogoMark   = 'https://www.figma.com/api/mcp/asset/8659061d-bdd9-4805-902d-42731b088ee4'
const imgLogoText   = 'https://www.figma.com/api/mcp/asset/455cd40f-de5b-4029-a5c1-167612dccfca'
const imgStar3      = 'https://www.figma.com/api/mcp/asset/e57b6c7d-a46b-4574-8a40-afdb4e553054'

export default function Inicio() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', background: '#82ea6f', overflow: 'hidden' }}>

      {/* Star 2 — top-left decoration */}
      <img alt="" src={imgStar2} style={{ position: 'absolute', left: '-510px', top: '-539px', width: '1077px', height: '1051.5px', pointerEvents: 'none' }} />

      {/* Star 4 — top-left decoration */}
      <img alt="" src={imgStar4} style={{ position: 'absolute', left: '-510px', top: '-539px', width: '973px', height: '919px', pointerEvents: 'none' }} />

      {/* Large polygon — center-bottom rotated */}
      <div style={{ position: 'absolute', left: '-367px', top: '633px', width: '1982px', height: '1982px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ transform: 'rotate(8.9deg)', flexShrink: 0 }}>
          <img alt="" src={imgPolygon3} style={{ width: '1735px', height: '1735px', display: 'block' }} />
        </div>
      </div>

      {/* Star 5 — top-right decoration */}
      <div style={{ position: 'absolute', left: '482px', top: '-892px', width: '1431px', height: '1431px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ transform: 'rotate(18.68deg)', flexShrink: 0 }}>
          <img alt="" src={imgStar5} style={{ width: '1129px', height: '1129px', display: 'block' }} />
        </div>
      </div>

      {/* Star 3 — bottom-left decoration */}
      <div style={{ position: 'absolute', left: '-431px', top: '906px', width: '817px', height: '734px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ transform: 'rotate(11.08deg)', flexShrink: 0 }}>
          <img alt="" src={imgStar3} style={{ width: '713px', height: '609px', display: 'block' }} />
        </div>
      </div>

      {/* Soccer player */}
      <img alt="" src={imgFutbolista} style={{ position: 'absolute', left: '-104px', top: '93px', width: '1219px', height: '997px', objectFit: 'cover', objectPosition: 'bottom', pointerEvents: 'none' }} />

      {/* Logo — top right (mark + "Experience Tech") */}
      <img alt="" src={imgLogoMark} style={{ position: 'absolute', left: '737px', top: '83px',  width: '243px', height: '53px', display: 'block' }} />
      <img alt="" src={imgLogoText} style={{ position: 'absolute', left: '737px', top: '145px', width: '243px', height: '28px', display: 'block' }} />

      {/* Title */}
      <div style={{
        position: 'absolute', left: '112px', top: '1105px', width: '857px', height: '161px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        fontFamily: '"Bungee", sans-serif', fontSize: '80px', lineHeight: '90px',
        color: '#232e2e', textAlign: 'center',
      }}>
        <p style={{ margin: 0 }}>Bienvenido al</p>
        <p style={{ margin: 0 }}>Photobooth IA</p>
      </div>

      {/* Subtitle */}
      <div style={{
        position: 'absolute', left: '117px', top: '1313px', width: '848px', height: '160px',
        display: 'flex', alignItems: 'center',
        fontFamily: '"Roboto", sans-serif', fontWeight: 400, fontSize: '50px', lineHeight: '55px',
        color: '#232e2e', textAlign: 'center',
      }}>
        <p style={{ margin: 0 }}>
          {'En la ruta al '}
          <span style={{ fontWeight: 700 }}>Mundial 2026</span>
          {' también hay paradas para la foto. '}
          <span style={{ fontWeight: 800 }}>Tómate la tuya y súmate al equipo.</span>
        </p>
      </div>

      {/* CTA button */}
      <button
        onClick={() => navigate('/registro')}
        style={{
          position: 'absolute', left: '99px', top: '1581px',
          width: '882px', height: '133px',
          background: '#232e2e', borderRadius: '66.5px', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800, fontSize: '65px', color: '#fff', lineHeight: 1 }}>
          Iniciar
        </span>
      </button>
    </div>
  )
}
