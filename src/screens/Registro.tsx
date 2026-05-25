import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Assets — Figma node 1:37
const imgImage10        = 'https://www.figma.com/api/mcp/asset/a98e424d-2549-45a4-b2f2-4abee97d7eeb'
const imgImage9         = 'https://www.figma.com/api/mcp/asset/651ca92d-a65b-4fe1-a937-cc7a2fc22c6d'
const imgIconUser       = 'https://www.figma.com/api/mcp/asset/e5a48776-d5b0-4857-8443-c1228d32e051' // imgGroup178 — person icon (Nombre)
const imgIconEmail      = 'https://www.figma.com/api/mcp/asset/1b8fcb11-bae8-4c96-b7dc-87a8ba5f1173' // imgIcon — email icon (Correo)
const imgLogoSmall      = 'https://www.figma.com/api/mcp/asset/6ff92953-8e64-48a2-b6a3-559baab1fdd3' // imgGroup1000005785 — top-left nav icons
const imgBrandMark      = 'https://www.figma.com/api/mcp/asset/a8a8d6ff-2000-4d61-9f5d-b8d64cf73b5e' // imgGroup — Mocion logo mark
const imgBrandText      = 'https://www.figma.com/api/mcp/asset/43d88ed0-89c1-4b49-b4a0-3464a3c81286' // imgGroup1 — "Experience Tech"

export default function Registro() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', background: '#efefef', overflow: 'hidden' }}>

      {/* Background watermark — top-left */}
      <img alt="" src={imgImage10} style={{ position: 'absolute', left: '-32px', top: '-35px', width: '526px', height: '525px', objectFit: 'cover', opacity: 0.1, pointerEvents: 'none' }} />

      {/* Background watermark — bottom-right */}
      <img alt="" src={imgImage9} style={{ position: 'absolute', left: '588px', top: '1372px', width: '722px', height: '724px', objectFit: 'cover', opacity: 0.08, pointerEvents: 'none' }} />

      {/* Small nav/brand icons — top-left  (calc: 540-417.5-73.5=49px) */}
      <img alt="" src={imgLogoSmall} style={{ position: 'absolute', left: '49px', top: '94px', width: '147px', height: '43px', display: 'block' }} />

      {/* Mocion brand mark — centered (inset 14.06%/20.28%/78.63%/20.28% → 219,270 642×140) */}
      <img alt="" src={imgBrandMark} style={{ position: 'absolute', left: '219px', top: '270px', width: '642px', height: '140px', display: 'block' }} />

      {/* "Experience Tech" text — centered (inset 22.53%/20.28%/73.6%/20.28% → 219,433 642×74) */}
      <img alt="" src={imgBrandText} style={{ position: 'absolute', left: '219px', top: '433px', width: '642px', height: '74px', display: 'block' }} />

      {/* REGISTRO title (center 540,759 → left=99, top=720, w=882, h=78) */}
      <div style={{
        position: 'absolute', left: '99px', top: '720px', width: '882px', height: '78px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Nunito", sans-serif', fontWeight: 800, fontSize: '97px', lineHeight: 'normal',
        color: '#ff006a', fontStyle: 'normal',
      }}>
        REGISTRO
      </div>

      {/* ── Nombre input ── (left=99, top=882, w=882, h=99) */}
      <div style={{
        position: 'absolute', left: '99px', top: '882px', width: '882px', height: '99px',
        background: 'rgba(255,255,255,0.15)', border: '1.5px solid #1e1e1e',
        borderRadius: '24px', boxSizing: 'border-box', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        {/* Person icon (absolute on canvas: left=159, top=912 → relative: 159-99=60, 912-882=30, w=26, h=38) */}
        <img alt="" src={imgIconUser} style={{ position: 'absolute', left: '60px', top: '30px', width: '26px', height: '38px', display: 'block' }} />
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{
            position: 'absolute', left: '120px', top: '0', width: 'calc(100% - 120px)', height: '100%',
            background: 'transparent', border: 'none', outline: 'none',
            fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: '40px',
            color: '#1e1e1e', caretColor: '#1e1e1e',
          }}
        />
        <span style={{
          position: 'absolute', left: '120px', top: '50%', transform: 'translateY(-50%)',
          fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: '40px',
          color: 'rgba(30,30,30,0.6)', pointerEvents: 'none',
          display: nombre ? 'none' : 'block',
        }}>
          Nombre
        </span>
      </div>

      {/* ── Correo input ── (left=99, top=1030, w=882, h=99) */}
      <div style={{
        position: 'absolute', left: '99px', top: '1030px', width: '882px', height: '99px',
        background: 'rgba(255,255,255,0.15)', border: '1.5px solid #1e1e1e',
        borderRadius: '24px', boxSizing: 'border-box', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        {/* Email icon (absolute: left=147, top=1060 → relative: 147-99=48, 1060-1030=30, w=50, h=38) */}
        <img alt="" src={imgIconEmail} style={{ position: 'absolute', left: '48px', top: '30px', width: '50px', height: '38px', display: 'block' }} />
        <input
          type="email"
          placeholder="Tu correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={{
            position: 'absolute', left: '120px', top: '0', width: 'calc(100% - 120px)', height: '100%',
            background: 'transparent', border: 'none', outline: 'none',
            fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: '40px',
            color: '#1e1e1e', caretColor: '#1e1e1e',
          }}
        />
        <span style={{
          position: 'absolute', left: '120px', top: '50%', transform: 'translateY(-50%)',
          fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: '40px',
          color: 'rgba(30,30,30,0.6)', pointerEvents: 'none',
          display: correo ? 'none' : 'block',
        }}>
          Correo
        </span>
      </div>

      {/* Comenzar button (center 540, left=198, top=1421, w=684, h=133) */}
      <button
        onClick={() => navigate('/instrucciones')}
        style={{
          position: 'absolute', left: '198px', top: '1421px', width: '684px', height: '133px',
          background: '#333', borderRadius: '66.5px', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800, fontSize: '65px', color: '#fff', lineHeight: 1 }}>
          Comenzar
        </span>
      </button>
    </div>
  )
}
