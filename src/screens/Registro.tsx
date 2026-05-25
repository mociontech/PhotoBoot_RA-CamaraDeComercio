import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const imgLogoGroup = 'https://www.figma.com/api/mcp/asset/a8a8d6ff-2000-4d61-9f5d-b8d64cf73b5e'
const imgLogoText = 'https://www.figma.com/api/mcp/asset/43d88ed0-89c1-4b49-b4a0-3464a3c81286'
const imgBg = 'https://www.figma.com/api/mcp/asset/a98e424d-2549-45a4-b2f2-4abee97d7eeb'

export default function Registro() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')

  const handleSubmit = () => {
    if (nombre.trim()) {
      navigate('/instrucciones')
    }
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#efefef' }}
    >
      {/* Faint background watermark */}
      <img
        alt=""
        src={imgBg}
        style={{
          position: 'absolute',
          left: '-32px',
          top: '-35px',
          width: '526px',
          height: '525px',
          objectFit: 'cover',
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      />

      {/* Logo */}
      <div style={{ position: 'absolute', left: '99px', top: '94px', height: '43px', width: '147px' }}>
        <img alt="Mocion" src={imgLogoGroup} style={{ height: '100%', width: 'auto', display: 'block' }} />
        <img alt="" src={imgLogoText} style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 'auto', display: 'block' }} />
      </div>

      {/* Mocion brand text block */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '270px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: '"Nunito", "Proxima Nova", sans-serif',
            fontWeight: 800,
            fontSize: '130px',
            lineHeight: '108px',
            color: '#ff006a',
            letterSpacing: '-1px',
          }}
        >
          Mocion
        </div>
        <div
          style={{
            fontFamily: '"Nunito", "Proxima Nova", sans-serif',
            fontWeight: 400,
            fontSize: '55px',
            color: '#333',
            marginTop: '10px',
          }}
        >
          Experience Tech
        </div>
      </div>

      {/* REGISTRO title */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '759px',
          textAlign: 'center',
          fontFamily: '"Nunito", "Proxima Nova", sans-serif',
          fontWeight: 800,
          fontSize: '97px',
          color: '#ff006a',
          letterSpacing: '-1px',
        }}
      >
        REGISTRO
      </div>

      {/* Nombre input */}
      <div
        style={{
          position: 'absolute',
          left: '99px',
          top: '882px',
          width: '882px',
          height: '99px',
          background: 'rgba(255,255,255,0.15)',
          border: '1.5px solid #1e1e1e',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          boxSizing: 'border-box',
          gap: '20px',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(30,30,30,0.6)" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: '"Inter", sans-serif',
            fontSize: '40px',
            color: '#1e1e1e',
            caretColor: '#1e1e1e',
          }}
        />
      </div>

      {/* Correo input */}
      <div
        style={{
          position: 'absolute',
          left: '99px',
          top: '1030px',
          width: '882px',
          height: '99px',
          background: 'rgba(255,255,255,0.15)',
          border: '1.5px solid #1e1e1e',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          boxSizing: 'border-box',
          gap: '20px',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(30,30,30,0.6)" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <input
          type="email"
          placeholder="Tu correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: '"Inter", sans-serif',
            fontSize: '40px',
            color: '#1e1e1e',
            caretColor: '#1e1e1e',
          }}
        />
      </div>

      {/* Comenzar button */}
      <button
        onClick={handleSubmit}
        style={{
          position: 'absolute',
          left: '198px',
          top: '1421px',
          width: '684px',
          height: '133px',
          background: '#333',
          borderRadius: '66.5px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: '"Nunito", "Proxima Nova", sans-serif',
            fontWeight: 800,
            fontSize: '65px',
            color: '#fff',
          }}
        >
          Comenzar
        </span>
      </button>
    </div>
  )
}
