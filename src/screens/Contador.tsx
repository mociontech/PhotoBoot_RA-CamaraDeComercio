import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Assets — Figma node 87:28
const imgExclude      = 'https://www.figma.com/api/mcp/asset/8cc720b6-e892-4206-9c7a-e31fba36c12d' // green frame
const imgMaskGroup    = 'https://www.figma.com/api/mcp/asset/169b7338-b6f7-4b9a-b76a-bebc0dc7166b' // polygon overlay
const imgBalon1       = 'https://www.figma.com/api/mcp/asset/38068260-2d33-484e-b0b9-9f4b82dca614' // soccer ball
const imgBtnRepetir   = 'https://www.figma.com/api/mcp/asset/41347e02-5da6-4d34-bcf5-1a27150af11d' // Group208 circle
const imgBtnSiguiente = 'https://www.figma.com/api/mcp/asset/e08aea04-9349-404f-be12-3e6d95a0d996' // Group192 circle
const imgLogo         = 'https://www.figma.com/api/mcp/asset/add251d0-cbcf-48f7-97a0-cb0d0f09e5db' // Mocion logo

export default function Contador() {
  const navigate = useNavigate()
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count <= 0) {
      navigate('/loader')
      return
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count, navigate])

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', background: '#000', overflow: 'hidden' }}>

      {/* Green frame overlay (Exclude shape) */}
      <img alt="" src={imgExclude} style={{ position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', display: 'block', pointerEvents: 'none' }} />

      {/* Polygon corner decoration overlay */}
      <img alt="" src={imgMaskGroup} style={{ position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', display: 'block', pointerEvents: 'none' }} />

      {/* Soccer ball — bottom-right */}
      <img alt="" src={imgBalon1} style={{ position: 'absolute', left: '707px', top: '1516px', width: '339px', height: '338px', objectFit: 'cover', pointerEvents: 'none' }} />

      {/* Mocion logo — top center */}
      <img alt="" src={imgLogo} style={{ position: 'absolute', left: '348px', top: '33px', width: '384px', height: '84px', display: 'block' }} />

      {/* Countdown number */}
      <div style={{
        position: 'absolute', left: '100px', top: '555px', width: '881px', height: '750px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Bungee", sans-serif', fontSize: '700px', lineHeight: 1,
        color: 'rgba(255,255,255,0.84)',
        textShadow: '0px 4px 60px rgba(0,0,0,0.5)',
        pointerEvents: 'none',
      }}>
        {count > 0 ? count : ''}
      </div>

      {/* Repetir button */}
      <button
        onClick={() => setCount(3)}
        style={{ position: 'absolute', left: '148px', top: '1535px', width: '136px', height: '136px', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
      >
        <img alt="Repetir" src={imgBtnRepetir} style={{ width: '100%', height: '100%', display: 'block' }} />
      </button>
      <span style={{ position: 'absolute', left: '152px', top: '1679px', width: '132px', height: '26px', textAlign: 'center', fontFamily: '"Roboto", sans-serif', fontWeight: 600, fontSize: '25px', color: '#fff', pointerEvents: 'none', display: 'block' }}>
        Repetir
      </span>

      {/* Siguiente button */}
      <button
        onClick={() => navigate('/loader')}
        style={{ position: 'absolute', left: '324px', top: '1535px', width: '136px', height: '136px', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
      >
        <img alt="Siguiente" src={imgBtnSiguiente} style={{ width: '100%', height: '100%', display: 'block' }} />
      </button>
      <span style={{ position: 'absolute', left: '325px', top: '1679px', width: '136px', height: '26px', textAlign: 'center', fontFamily: '"Roboto", sans-serif', fontWeight: 600, fontSize: '25px', color: '#f16623', pointerEvents: 'none', display: 'block' }}>
        Siguiente
      </span>
    </div>
  )
}
