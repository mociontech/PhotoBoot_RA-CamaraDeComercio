import { useNavigate } from 'react-router-dom'

// Assets — Figma node 87:286
const imgPolygon1    = 'https://www.figma.com/api/mcp/asset/6890bffe-e1ed-4495-8e59-c32d67dd0dcc'
const imgPolygon2    = 'https://www.figma.com/api/mcp/asset/5284e2bb-4aa5-4d18-addb-1b2eea8fd8ae'
const imgLogoSmall   = 'https://www.figma.com/api/mcp/asset/13cd24ad-53cb-4737-94c1-13d5d104f765' // Group1000005785
const imgBrandMark   = 'https://www.figma.com/api/mcp/asset/47137b42-ec4c-4be8-bf3b-b508b958d619' // Mocion
const imgBrandText   = 'https://www.figma.com/api/mcp/asset/9161df83-9e28-4040-8405-a48cfd141bda' // Experience Tech
const imgQR          = 'https://www.figma.com/api/mcp/asset/fea9c4b7-0e79-47ca-af76-ebc3b7f503a6' // QR code

export default function Agradecimiento() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', background: '#6fcfea', overflow: 'hidden' }}>

      {/* Polygon 1 — bottom-left */}
      <div style={{ position: 'absolute', left: '-748px', top: '839px', width: '1459px', height: '1459px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ transform: 'rotate(-12.91deg)', flexShrink: 0 }}>
          <div style={{ position: 'relative', width: '1218px', height: '1218px' }}>
            <img alt="" src={imgPolygon1} style={{ position: 'absolute', top: 0, left: '29.8px', width: '1158px', height: '1101px', display: 'block' }} />
          </div>
        </div>
      </div>

      {/* Polygon 2 — bottom-right */}
      <div style={{ position: 'absolute', left: '147px', top: '861px', width: '1579px', height: '1579px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ transform: 'rotate(23.2deg)', flexShrink: 0 }}>
          <div style={{ position: 'relative', width: '1202px', height: '1202px' }}>
            <img alt="" src={imgPolygon2} style={{ position: 'absolute', top: 0, left: '29.5px', width: '1143px', height: '1087px', display: 'block' }} />
          </div>
        </div>
      </div>

      {/* Nav logo — top-left */}
      <img alt="" src={imgLogoSmall} style={{ position: 'absolute', left: '98px', top: '95px', width: '147px', height: '43px', display: 'block' }} />

      {/* Mocion brand mark */}
      <img alt="" src={imgBrandMark} style={{ position: 'absolute', left: '219px', top: '294px', width: '642px', height: '140px', display: 'block' }} />

      {/* Experience Tech */}
      <img alt="" src={imgBrandText} style={{ position: 'absolute', left: '219px', top: '457px', width: '642px', height: '63px', display: 'block' }} />

      {/* ¡Gracias por participar! (center 530.5,804.5 h=237 → top=686) */}
      <div style={{
        position: 'absolute', left: '114px', top: '686px', width: '833px', height: '237px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Nunito", sans-serif', fontWeight: 800, fontSize: '130px', lineHeight: '108px',
        color: '#333', textAlign: 'center',
      }}>
        ¡Gracias por participar!
      </div>

      {/* Subtitle (center 540,1026.5 h=173 → top=940) */}
      <div style={{
        position: 'absolute', left: '214px', top: '940px', width: '652px', height: '173px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"League Spartan", "Nunito", sans-serif', fontWeight: 300, fontSize: '48.75px', lineHeight: '53px',
        color: '#333', textAlign: 'center',
      }}>
        <p style={{ margin: 0 }}>
          {'Descarga tu imagen '}
          <span style={{ fontWeight: 600 }}>escaneando el siguiente código QR.</span>
        </p>
      </div>

      {/* QR Code (left=365, top=1177, w=350, h=350) */}
      <div style={{
        position: 'absolute', left: '365px', top: '1177px', width: '350px', height: '350px',
        background: '#fff', borderRadius: '12px', overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
      }}>
        <img alt="Código QR" src={imgQR} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      {/* Finalizar button (left=191, top=1625) */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', left: '191px', top: '1625px', width: '684px', height: '133px',
          background: '#333', borderRadius: '66.5px', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800, fontSize: '65px', color: '#fff', lineHeight: 1 }}>
          Finalizar
        </span>
      </button>
    </div>
  )
}
