import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Particles from '../components/Particles'

// Assets — Figma node 34:40292
const imgPolygon1       = 'https://www.figma.com/api/mcp/asset/4a407757-442c-4cb9-ae9a-d618dd0ec8af'
const imgPolygon2       = 'https://www.figma.com/api/mcp/asset/8eea2ba1-e6af-445b-a2ba-ca1d38ce49ff'
const imgLogoSmall      = 'https://www.figma.com/api/mcp/asset/c1125652-ebb2-49b2-a8a5-7e9ca3c23af9' // imgGroup1000005785 — top-left nav icons
const imgLogoRight      = 'https://www.figma.com/api/mcp/asset/ff7b0ac5-8b93-45c7-8542-9555b381ebf7' // imgGroup — "Mocion" top-right
const imgEstadioMask    = 'https://www.figma.com/api/mcp/asset/e083a8c1-cd2e-4d71-a375-79583ac54735' // rounded card mask shape
const imgEstadio2       = 'https://www.figma.com/api/mcp/asset/7d49aec6-8819-4d48-a4b2-a5a1be71a91b' // estadio2 2 — right card
const imgEstadio1       = 'https://www.figma.com/api/mcp/asset/55873e72-e9dc-4595-b776-08c79d951d9b' // estadio1 1 — left card

// Card dimensions derived from Figma mask-size: 319×567
const CARD_W = 319
const CARD_H = 567

export default function SeleccionFondo() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<1 | 2 | null>(null)

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', background: '#6fcfea', overflow: 'hidden' }}>

      <Particles color="rgba(255,255,255,0.8)" count={22} />

      {/* Polygon 1 — bottom-left decoration */}
      <div style={{ position: 'absolute', left: '-510px', top: '438px', width: '1313px', height: '1275px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ transform: 'rotate(-20.1deg)', flexShrink: 0 }}>
          <img alt="" src={imgPolygon1} style={{ width: '1040px', height: '977px', display: 'block' }} />
        </div>
      </div>

      {/* Polygon 2 — right decoration */}
      <div style={{ position: 'absolute', left: '345px', top: '438px', width: '1210px', height: '1210px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ transform: 'rotate(16.01deg)', flexShrink: 0 }}>
          <img alt="" src={imgPolygon2} style={{ width: '979px', height: '977px', display: 'block' }} />
        </div>
      </div>

      {/* Nav icons top-left */}
      <img alt="" className="slide-in-down"    src={imgLogoSmall} style={{ position: 'absolute', left: '98px', top: '95px', width: '147px', height: '43px', display: 'block' }} />

      {/* "Mocion" logo top-right */}
      <img alt="" className="slide-in-down d1" src={imgLogoRight} style={{ position: 'absolute', left: '686px', top: '79px', width: '294px', height: '64px', display: 'block' }} />

      {/* Title */}
      <div className="slide-in-left d2" style={{
        position: 'absolute', left: '111px', top: '438px', width: '857px', height: '181px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Bungee", sans-serif', fontSize: '100px', lineHeight: '90px',
        color: '#2d2d2d', textAlign: 'center',
      }}>
        <p style={{ margin: 0 }}>Selecciona</p>
        <p style={{ margin: 0 }}>un fondo</p>
      </div>

      {/* ── Background cards ──
          Derived from Figma mask groups:
          Card 1 (left):  mask-position 171px, container left≈31px  → visible card at x≈202px
          Card 2 (right): mask-position 170px, container left≈388px → visible card at x≈558px
          Both at top=670px, visible height=567px
      */}

      {/* Card 1 — estadio 1 (left) */}
      <button
        className="card-hover slide-in-left d3"
        onClick={() => setSelected(1)}
        style={{
          position: 'absolute', left: '202px', top: '676px',
          width: `${CARD_W}px`, height: `${CARD_H}px`,
          padding: 0, border: 'none', background: 'transparent', cursor: 'pointer',
          borderRadius: '24px', overflow: 'hidden',
          outline: selected === 1 ? '8px solid #232e2e' : '4px solid transparent',
          outlineOffset: '0px',
          transition: 'transform 0.2s ease, filter 0.18s ease, box-shadow 0.2s ease, outline 0.15s',
        }}
      >
        <img
          src={imgEstadio1}
          alt="Fondo 1"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            WebkitMaskImage: `url(${imgEstadioMask})`,
            WebkitMaskSize: '100% 100%',
            maskImage: `url(${imgEstadioMask})`,
            maskSize: '100% 100%',
          }}
        />
        {selected === 1 && (
          <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '48px', height: '48px', background: '#232e2e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        )}
      </button>

      {/* Card 2 — estadio 2 (right) */}
      <button
        className="card-hover slide-in-right d3"
        onClick={() => setSelected(2)}
        style={{
          position: 'absolute', left: '558px', top: '676px',
          width: `${CARD_W}px`, height: `${CARD_H}px`,
          padding: 0, border: 'none', background: 'transparent', cursor: 'pointer',
          borderRadius: '24px', overflow: 'hidden',
          outline: selected === 2 ? '8px solid #232e2e' : '4px solid transparent',
          outlineOffset: '0px',
          transition: 'transform 0.2s ease, filter 0.18s ease, box-shadow 0.2s ease, outline 0.15s',
        }}
      >
        <img
          src={imgEstadio2}
          alt="Fondo 2"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            WebkitMaskImage: `url(${imgEstadioMask})`,
            WebkitMaskSize: '100% 100%',
            maskImage: `url(${imgEstadioMask})`,
            maskSize: '100% 100%',
          }}
        />
        {selected === 2 && (
          <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '48px', height: '48px', background: '#232e2e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        )}
      </button>

      {/* Continuar button (center 540.5 → left=113, top=1456, w=855, h=133) */}
      <button
        className={`kiosk-btn${selected ? ' btn-pulse' : ''}`}
        onClick={() => { if (selected) navigate('/contador') }}
        style={{
          position: 'absolute', left: '113px', top: '1456px', width: '855px', height: '133px',
          background: selected ? '#2d2d2d' : 'rgba(45,45,45,0.4)',
          borderRadius: '24px', border: 'none',
          cursor: selected ? 'pointer' : 'not-allowed',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        }}
      >
        <span style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 700, fontSize: '65px', color: '#fff', lineHeight: 1 }}>
          Continuar
        </span>
      </button>
    </div>
  )
}
