import { useNavigate } from 'react-router-dom'

// Assets — Figma node 34:162
const imgResult    = 'https://www.figma.com/api/mcp/asset/92f8e2f9-d7dc-4240-90f8-f2e28353003b' // imgImage1 — generated photo
const imgExclude   = 'https://www.figma.com/api/mcp/asset/e781ff63-2fcd-4316-8e4f-944da282b09a' // green side strips frame
const imgMaskGroup = 'https://www.figma.com/api/mcp/asset/d0d7bb95-3833-4998-b440-60cc43ea128b' // layered mask overlay
const imgBall      = 'https://www.figma.com/api/mcp/asset/0453b4f5-a34f-4943-9b4d-943c34b676f8' // imgBalon1 — soccer ball
const imgLogo      = 'https://www.figma.com/api/mcp/asset/5a4a902c-9d47-4b30-87ea-3d2da4d383f1' // imgGroup — "Mocion" top-center

export default function Resultado() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', background: '#e8e8e8', overflow: 'hidden' }}>

      {/* Generated photo — full screen */}
      <img alt="Imagen generada" src={imgResult} style={{ position: 'absolute', left: '1px', top: 0, width: '1080px', height: '1920px', objectFit: 'cover', pointerEvents: 'none' }} />

      {/* Green strips frame overlay (Exclude shape) */}
      <img alt="" src={imgExclude} style={{ position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', display: 'block', pointerEvents: 'none' }} />

      {/* Mask group overlay */}
      <img alt="" src={imgMaskGroup} style={{ position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', display: 'block', pointerEvents: 'none' }} />

      {/* Soccer ball — bottom-right (left=707, top=1516, w=339, h=338) */}
      <img alt="" src={imgBall} style={{ position: 'absolute', left: '707px', top: '1516px', width: '339px', height: '338px', objectFit: 'cover', pointerEvents: 'none' }} />

      {/* Logo "Mocion" — top-center (inset 1.74%/32.23%/93.9%/32.22% → left=348, top=33, w=384, h=84) */}
      <img alt="Mocion" src={imgLogo} style={{ position: 'absolute', left: '348px', top: '33px', width: '384px', height: '84px', display: 'block' }} />

      {/* Continuar button */}
      <button
        className="kiosk-btn btn-pulse"
        onClick={() => navigate('/agradecimiento')}
        style={{
          position: 'absolute', left: '140px', bottom: '60px',
          width: '800px', height: '120px',
          background: '#232e2e', borderRadius: '60px', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <span style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800, fontSize: '60px', color: '#fff', lineHeight: 1 }}>
          Continuar
        </span>
      </button>
    </div>
  )
}
