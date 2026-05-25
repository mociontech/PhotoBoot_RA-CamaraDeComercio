import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SeleccionFondo() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<1 | 2 | null>(null)

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', overflow: 'hidden' }}>

      <img
        src="/assets/screens/seleccion.png"
        alt=""
        draggable={false}
        style={{ position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', display: 'block', userSelect: 'none' }}
      />

      {/* Área clickable — Fondo 1 (card izquierda: left=202, top=676, w=319, h=567) */}
      <button
        onClick={() => setSelected(1)}
        aria-label="Seleccionar fondo 1"
        style={{
          position: 'absolute', left: '202px', top: '676px', width: '319px', height: '567px',
          background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '24px',
          outline: selected === 1 ? '7px solid #2d2d2d' : '7px solid transparent',
          outlineOffset: '-7px',
          transition: 'outline-color 0.15s',
        }}
      >
        {selected === 1 && (
          <div style={{
            position: 'absolute', bottom: '14px', right: '14px',
            width: '52px', height: '52px', borderRadius: '50%',
            background: '#2d2d2d',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        )}
      </button>

      {/* Área clickable — Fondo 2 (card derecha: left=558, top=676, w=319, h=567) */}
      <button
        onClick={() => setSelected(2)}
        aria-label="Seleccionar fondo 2"
        style={{
          position: 'absolute', left: '558px', top: '676px', width: '319px', height: '567px',
          background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '24px',
          outline: selected === 2 ? '7px solid #2d2d2d' : '7px solid transparent',
          outlineOffset: '-7px',
          transition: 'outline-color 0.15s',
        }}
      >
        {selected === 2 && (
          <div style={{
            position: 'absolute', bottom: '14px', right: '14px',
            width: '52px', height: '52px', borderRadius: '50%',
            background: '#2d2d2d',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        )}
      </button>

      {/* Tap area "Continuar" (left=113, top=1456, w=855, h=133) */}
      <button
        onClick={() => { if (selected) navigate('/contador') }}
        aria-label="Continuar"
        style={{
          position: 'absolute', left: '113px', top: '1456px', width: '855px', height: '133px',
          background: 'transparent', border: 'none',
          cursor: selected ? 'pointer' : 'not-allowed',
          opacity: selected ? 1 : 0.4,
        }}
      />
    </div>
  )
}
