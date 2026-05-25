import { useNavigate } from 'react-router-dom'

// Assets — Figma node 1:577
const imgImage10   = 'https://www.figma.com/api/mcp/asset/6e03fd26-dfcb-44f0-af7b-ae782c0adc91' // bg watermark top-left
const imgImage9    = 'https://www.figma.com/api/mcp/asset/1e3b115d-45a0-4db7-8a0d-a6f8c034fcce' // bg watermark bottom-right
const imgLogoSmall = 'https://www.figma.com/api/mcp/asset/d50df64c-27e5-405f-b39a-57b04c4b525f' // imgGroup1000005785 — top-left nav
const imgBrandMark = 'https://www.figma.com/api/mcp/asset/5af7c117-3f90-4985-ad36-131a5d390077' // imgGroup — Mocion brand mark
const imgBrandText = 'https://www.figma.com/api/mcp/asset/f44f8359-45bf-4f13-b974-36360cabc15c' // imgGroup1 — "Experience Tech"
const imgQR        = 'https://www.figma.com/api/mcp/asset/2df2c57e-1f8c-4cb1-9b2d-c2c001346083' // imgCapa_1 1 — QR code

export default function Agradecimiento() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', background: '#efefef', overflow: 'hidden' }}>

      {/* Background watermark — top-left */}
      <img alt="" src={imgImage10} style={{ position: 'absolute', left: '-32px', top: '-35px', width: '526px', height: '525px', objectFit: 'cover', opacity: 0.1, pointerEvents: 'none' }} />

      {/* Background watermark — bottom-right */}
      <img alt="" src={imgImage9} style={{ position: 'absolute', left: '588px', top: '1372px', width: '722px', height: '724px', objectFit: 'cover', opacity: 0.08, pointerEvents: 'none' }} />

      {/* Nav icons top-left (same calc as Registro: left≈49, top=94) */}
      <img alt="" src={imgLogoSmall} style={{ position: 'absolute', left: '49px', top: '94px', width: '147px', height: '43px', display: 'block' }} />

      {/* Brand mark — centered (inset 18.39%/20.28%/74.31%/20.28% → 219,353 642×114) */}
      <img alt="" src={imgBrandMark} style={{ position: 'absolute', left: '219px', top: '353px', width: '642px', height: '114px', display: 'block' }} />

      {/* Brand text "Experience Tech" — (inset 26.85%/20.28%/69.28%/20.28% → 219,515 642×75) */}
      <img alt="" src={imgBrandText} style={{ position: 'absolute', left: '219px', top: '515px', width: '642px', height: '75px', display: 'block' }} />

      {/* "¡Gracias por participar!" (center 530.5,838.5 h=237 → left=114, top=720) */}
      <div style={{
        position: 'absolute', left: '114px', top: '720px', width: '833px', height: '237px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Nunito", sans-serif', fontWeight: 800, fontSize: '130px', lineHeight: '108px',
        color: '#333', textAlign: 'center',
      }}>
        ¡Gracias por participar!
      </div>

      {/* Subtitle (center 540,1060.5 h=173 → left=214, top=974) */}
      <div style={{
        position: 'absolute', left: '214px', top: '974px', width: '652px', height: '173px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"League Spartan", "Nunito", sans-serif', fontWeight: 300, fontSize: '48.75px', lineHeight: '53px',
        color: '#333', textAlign: 'center',
      }}>
        <p style={{ margin: 0 }}>
          {'Descarga tu imagen '}
          <span style={{ fontWeight: 600 }}>escaneando el siguiente código QR.</span>
        </p>
      </div>

      {/* QR Code (left=365, top=1211, w=350, h=350) */}
      <div style={{
        position: 'absolute', left: '365px', top: '1211px', width: '350px', height: '350px',
        background: '#fff', borderRadius: '12px', overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
      }}>
        <img alt="Código QR" src={imgQR} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      {/* Finalizar button (center 540, top≈1680) */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', left: '198px', top: '1680px', width: '684px', height: '133px',
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
