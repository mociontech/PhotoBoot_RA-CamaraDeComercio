import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const imgPolygon1 = 'https://www.figma.com/api/mcp/asset/de521f93-c7d3-4be6-991d-bff8ff41cd74'
const imgPolygon2 = 'https://www.figma.com/api/mcp/asset/e5d51732-0fa7-40ce-adac-4c0a5f8a807d'
const imgLogoGroup = 'https://www.figma.com/api/mcp/asset/3907cad9-b0a2-42ae-b9ca-c9919498e1e3'
const imgSpinner = 'https://www.figma.com/api/mcp/asset/84433b14-f67c-4068-a989-928239e29488'

export default function Loader() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/resultado'), 4000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#00eacd' }}
    >
      {/* Decorative polygons */}
      <div
        style={{
          position: 'absolute',
          left: '-537px',
          top: '487px',
          width: '1305px',
          height: '1305px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ transform: 'rotate(-12.91deg)', flexShrink: 0 }}>
          <img alt="" src={imgPolygon1} style={{ width: '1089px', height: '1089px', display: 'block' }} />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '264px',
          top: '507px',
          width: '1412px',
          height: '1412px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ transform: 'rotate(23.2deg)', flexShrink: 0 }}>
          <img alt="" src={imgPolygon2} style={{ width: '1075px', height: '1075px', display: 'block' }} />
        </div>
      </div>

      {/* Logo */}
      <div style={{ position: 'absolute', left: '99px', top: '95px', height: '43px', width: '147px' }}>
        <img alt="Mocion" src={imgLogoGroup} style={{ height: '100%', width: 'auto', display: 'block' }} />
      </div>

      {/* Mocion brand (top-right) */}
      <div
        style={{
          position: 'absolute',
          right: '60px',
          top: '40px',
          fontFamily: '"Nunito", "Proxima Nova", sans-serif',
          fontWeight: 700,
          fontSize: '72px',
          color: '#333',
        }}
      >
        Mocion
      </div>

      {/* Spinner icon */}
      <img
        alt="Loading"
        src={imgSpinner}
        style={{
          position: 'absolute',
          left: '341px',
          top: '538px',
          width: '397px',
          height: '397px',
          display: 'block',
          animation: 'spin 1.2s linear infinite',
        }}
      />

      {/* Loading text */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '1050px',
          textAlign: 'center',
          fontFamily: '"Nunito", "Proxima Nova", sans-serif',
          fontWeight: 700,
          fontSize: '80px',
          lineHeight: '90px',
          color: '#333',
          padding: '0 116px',
          boxSizing: 'border-box',
        }}
      >
        Espera el procesamiento de tu visión
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
