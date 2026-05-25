import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const imgBg = 'https://www.figma.com/api/mcp/asset/170f1f99-4827-4aae-bead-80e27937c138'
const imgLogoGroup = 'https://www.figma.com/api/mcp/asset/f00cdbe2-a666-4b96-986c-22a824f4607b'
const imgLogoText = 'https://www.figma.com/api/mcp/asset/46d3117c-977c-4843-9354-40bbbee44a9d'

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
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#1a1a2e' }}
    >
      {/* Camera background */}
      <img
        alt=""
        src={imgBg}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '2712px',
          height: '1836px',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
        }}
      />

      {/* Rounded photo frame */}
      <div
        style={{
          position: 'absolute',
          left: '75px',
          top: '90px',
          width: '930px',
          height: '1740px',
          borderRadius: '48px',
          border: '6px solid rgba(255,255,255,0.3)',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <img
          alt=""
          src={imgBg}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Logo */}
      <div style={{ position: 'absolute', left: '99px', top: '56px', height: '43px', width: '147px' }}>
        <img alt="Mocion" src={imgLogoGroup} style={{ height: '100%', width: 'auto', display: 'block' }} />
        <img alt="" src={imgLogoText} style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 'auto', display: 'block' }} />
      </div>

      {/* Countdown number */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'center',
          fontFamily: '"Nunito", "Proxima Nova", sans-serif',
          fontWeight: 800,
          fontSize: '700px',
          lineHeight: '700px',
          color: 'rgba(255,255,255,0.84)',
          textShadow: '0px 4px 60px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
        }}
      >
        {count > 0 ? count : ''}
      </div>

      {/* Smile emoji hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          fontSize: '80px',
        }}
      >
        <span>😊</span>
        <span>🔴</span>
        <span>⚽</span>
      </div>
    </div>
  )
}
