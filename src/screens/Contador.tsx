import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Contador() {
  const navigate = useNavigate()
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count <= 0) { navigate('/loader'); return }
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count, navigate])

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', overflow: 'hidden' }}>

      {/* Screenshot del Figma como base visual */}
      <img
        src="/assets/screens/contador.png"
        alt=""
        draggable={false}
        style={{ position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', display: 'block', userSelect: 'none' }}
      />

      {/* Caja oscura que tapa el "3" estático del screenshot */}
      <div style={{
        position: 'absolute', left: '100px', top: '555px', width: '881px', height: '750px',
        background: 'rgba(0,0,0,0)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Número dinámico — mismo estilo que el Figma */}
        <span style={{
          fontFamily: '"Nunito", sans-serif', fontWeight: 800,
          fontSize: '700px', lineHeight: 1,
          color: 'rgba(255,255,255,0.84)',
          textShadow: '0px 4px 60px rgba(0,0,0,0.5)',
        }}>
          {count > 0 ? count : ''}
        </span>
      </div>
    </div>
  )
}
