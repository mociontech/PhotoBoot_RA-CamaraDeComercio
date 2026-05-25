import { useNavigate } from 'react-router-dom'

export default function Instrucciones() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', overflow: 'hidden' }}>

      <img
        src="/assets/screens/instrucciones.png"
        alt=""
        draggable={false}
        style={{ position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', display: 'block', userSelect: 'none' }}
      />

      {/* Tap area sobre "Continuar" (left=113, top=1456, w=855, h=133) */}
      <button
        onClick={() => navigate('/seleccion-fondo')}
        aria-label="Continuar"
        style={{
          position: 'absolute', left: '113px', top: '1456px', width: '855px', height: '133px',
          background: 'transparent', border: 'none', cursor: 'pointer',
        }}
      />
    </div>
  )
}
