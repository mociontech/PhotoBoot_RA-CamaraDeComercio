import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Assets — Figma node 1:465
const imgBg         = 'https://www.figma.com/api/mcp/asset/170f1f99-4827-4aae-bead-80e27937c138' // imgImage11 — camera bg
const imgBgOverlay  = 'https://www.figma.com/api/mcp/asset/f3b30da9-665f-44bc-9a6b-63c0d2bbcaba' // imgBgHeroMail31 — color bg overlay
const imgLogoSmall  = 'https://www.figma.com/api/mcp/asset/46d3117c-977c-4843-9354-40bbbee44a9d' // imgGroup1000005785 — top-left logo
const imgNavIcons   = 'https://www.figma.com/api/mcp/asset/f00cdbe2-a666-4b96-986c-22a824f4607b' // imgGroup — nav icons top area

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
    <div style={{ position: 'relative', width: '1080px', height: '1920px', background: '#1a1a2e', overflow: 'hidden' }}>

      {/* Camera background — full bleed (centered: left=50%-31px-50%*2712=-306, top=50%+1px-50%*1836=-917) */}
      <img alt="" src={imgBg} style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '2712px', height: '1836px',
        objectFit: 'cover', pointerEvents: 'none',
      }} />

      {/* Color gradient overlay */}
      <img alt="" src={imgBgOverlay} style={{
        position: 'absolute', left: 0, top: 0, width: '100%', height: '100%',
        objectFit: 'cover', opacity: 0.57, pointerEvents: 'none',
      }} />

      {/* Dark vignette overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', pointerEvents: 'none' }} />

      {/* Rounded phone frame */}
      <div style={{
        position: 'absolute', left: '75px', top: '90px',
        width: '930px', height: '1740px',
        borderRadius: '48px',
        border: '4px solid rgba(255,255,255,0.25)',
        overflow: 'hidden', boxSizing: 'border-box',
        pointerEvents: 'none',
      }}>
        <img alt="" src={imgBg} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
      </div>

      {/* Nav icons top-left (inset 1.88%/32.02%/93.71%/32.04% → left=346, top=36, w=388, h=84) */}
      <img alt="" src={imgNavIcons} style={{ position: 'absolute', left: '346px', top: '36px', width: '388px', height: '84px', display: 'block' }} />

      {/* Small logo top-left (left≈49px, top=56) */}
      <img alt="" src={imgLogoSmall} style={{ position: 'absolute', left: '49px', top: '56px', width: '147px', height: '43px', display: 'block' }} />

      {/* Countdown number (center 540.5, 930 → left=100, top=555, w=881, h=750) */}
      <div style={{
        position: 'absolute', left: '100px', top: '555px', width: '881px', height: '750px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Nunito", sans-serif', fontWeight: 800, fontSize: '700px', lineHeight: 1,
        color: 'rgba(255,255,255,0.84)',
        textShadow: '0px 4px 60px rgba(0,0,0,0.5)',
        pointerEvents: 'none',
      }}>
        {count > 0 ? count : ''}
      </div>

      {/* Bottom icons */}
      <div style={{
        position: 'absolute', bottom: '80px', left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: '40px',
        fontSize: '80px',
      }}>
        <span>😊</span>
        <span style={{ color: '#ff4444', fontSize: '72px' }}>●</span>
        <span>⚽</span>
      </div>
    </div>
  )
}
