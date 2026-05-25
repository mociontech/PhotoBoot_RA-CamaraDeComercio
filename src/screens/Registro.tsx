import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Registro() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', overflow: 'hidden' }}>

      {/* Exact Figma screenshot */}
      <img
        src="/assets/screens/registro.png"
        alt=""
        draggable={false}
        style={{ position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', display: 'block', userSelect: 'none' }}
      />

      {/* Input Nombre — posicionado sobre el campo visual del screenshot
          Figma: left=99, top=882, w=882, h=99 */}
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
        style={{
          position: 'absolute', left: '120px', top: '882px', width: '742px', height: '99px',
          background: 'transparent', border: 'none', outline: 'none',
          fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: '40px',
          color: '#1e1e1e', caretColor: '#ff006a',
          padding: '0 16px', boxSizing: 'border-box',
        }}
      />

      {/* Input Correo — Figma: top=1030 */}
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Tu correo"
        style={{
          position: 'absolute', left: '120px', top: '1030px', width: '742px', height: '99px',
          background: 'transparent', border: 'none', outline: 'none',
          fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: '40px',
          color: '#1e1e1e', caretColor: '#ff006a',
          padding: '0 16px', boxSizing: 'border-box',
        }}
      />

      {/* Tap area sobre botón "Comenzar" (left=198, top=1421, w=684, h=133) */}
      <button
        onClick={() => navigate('/instrucciones')}
        aria-label="Comenzar"
        style={{
          position: 'absolute', left: '198px', top: '1421px', width: '684px', height: '133px',
          background: 'transparent', border: 'none', cursor: 'pointer',
        }}
      />
    </div>
  )
}
