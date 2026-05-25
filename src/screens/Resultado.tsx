import { useNavigate } from 'react-router-dom'

const imgResult = 'https://www.figma.com/api/mcp/asset/92f8e2f9-d7dc-4240-90f8-f2e28353003b'
const imgBall = 'https://www.figma.com/api/mcp/asset/0453b4f5-a34f-4943-9b4d-943c34b676f8'
const imgOverlay = 'https://www.figma.com/api/mcp/asset/e781ff63-2fcd-4316-8e4f-944da282b09a'
const imgMaskGroup = 'https://www.figma.com/api/mcp/asset/d0d7bb95-3833-4998-b440-60cc43ea128b'
const imgLogoGroup = 'https://www.figma.com/api/mcp/asset/5a4a902c-9d47-4b30-87ea-3d2da4d383f1'

export default function Resultado() {
  const navigate = useNavigate()

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#e8e8e8' }}
    >
      {/* Full-screen generated result image */}
      <img
        alt="Imagen generada"
        src={imgResult}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />

      {/* Overlay frame (green strips) */}
      <img
        alt=""
        src={imgOverlay}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '1080px',
          height: '1920px',
          display: 'block',
          pointerEvents: 'none',
        }}
      />

      {/* Mask group overlay */}
      <img
        alt=""
        src={imgMaskGroup}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '1080px',
          height: '1920px',
          display: 'block',
          pointerEvents: 'none',
        }}
      />

      {/* Soccer ball bottom-right */}
      <img
        alt=""
        src={imgBall}
        style={{
          position: 'absolute',
          right: '34px',
          bottom: '84px',
          width: '339px',
          height: '338px',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />

      {/* Logo */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '33px', height: '43px' }}>
        <img alt="Mocion" src={imgLogoGroup} style={{ height: '100%', width: 'auto', display: 'block' }} />
      </div>

      {/* Continue to Agradecimiento */}
      <button
        onClick={() => navigate('/agradecimiento')}
        style={{
          position: 'absolute',
          left: '140px',
          bottom: '60px',
          width: '800px',
          height: '120px',
          background: '#232e2e',
          borderRadius: '60px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: '"Nunito", "Proxima Nova", sans-serif',
            fontWeight: 800,
            fontSize: '60px',
            color: '#fff',
          }}
        >
          Continuar
        </span>
      </button>
    </div>
  )
}
