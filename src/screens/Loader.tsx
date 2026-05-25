import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Assets — Figma node 34:50664
const imgPolygon1  = 'https://www.figma.com/api/mcp/asset/de521f93-c7d3-4be6-991d-bff8ff41cd74'
const imgPolygon2  = 'https://www.figma.com/api/mcp/asset/e5d51732-0fa7-40ce-adac-4c0a5f8a807d'
const imgLogoSmall = 'https://www.figma.com/api/mcp/asset/3907cad9-b0a2-42ae-b9ca-c9919498e1e3' // imgGroup1000005785
const imgLogoRight = 'https://www.figma.com/api/mcp/asset/86e51747-fc51-4b9e-96a5-a24377351258' // imgGroup — "Mocion" top-right
const imgSpinner   = 'https://www.figma.com/api/mcp/asset/84433b14-f67c-4068-a989-928239e29488' // imgCapa1 — spinner

export default function Loader() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/resultado'), 4000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', background: '#00eacd', overflow: 'hidden' }}>

      {/* Polygon 1 — bottom-left */}
      <div style={{ position: 'absolute', left: '-537px', top: '487px', width: '1305px', height: '1305px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ transform: 'rotate(-12.91deg)', flexShrink: 0 }}>
          <img alt="" src={imgPolygon1} style={{ width: '1089px', height: '1089px', display: 'block' }} />
        </div>
      </div>

      {/* Polygon 2 — right */}
      <div style={{ position: 'absolute', left: '264px', top: '507px', width: '1413px', height: '1413px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ transform: 'rotate(23.2deg)', flexShrink: 0 }}>
          <img alt="" src={imgPolygon2} style={{ width: '1076px', height: '1076px', display: 'block' }} />
        </div>
      </div>

      {/* Nav icons top-left (calc: 540-368.5-73.5=98, top=95) */}
      <img alt="" src={imgLogoSmall} style={{ position: 'absolute', left: '98px', top: '95px', width: '147px', height: '43px', display: 'block' }} />

      {/* "Mocion" logo top-right (inset 4.11%/9.26%/92.54%/63.52% → left=686, top=79, w=294, h=64) */}
      <img alt="" src={imgLogoRight} style={{ position: 'absolute', left: '686px', top: '79px', width: '294px', height: '64px', display: 'block' }} />

      {/* Spinner (left=341, top=538, w=397, h=397) */}
      <img
        alt="Cargando…"
        src={imgSpinner}
        style={{
          position: 'absolute', left: '341px', top: '538px', width: '397px', height: '397px', display: 'block',
          animation: 'spin 1.2s linear infinite',
        }}
      />

      {/* Text (center 540,1216.5 h=173 → left=116, top=1130) */}
      <div style={{
        position: 'absolute', left: '116px', top: '1130px', width: '848px', height: '173px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Nunito", sans-serif', fontWeight: 700, fontSize: '80px', lineHeight: '90px',
        color: '#333', textAlign: 'center',
        letterSpacing: '1.23px',
      }}>
        Espera el procesamiento de tu visión
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
