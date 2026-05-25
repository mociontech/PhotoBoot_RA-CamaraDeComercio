import { useNavigate } from 'react-router-dom'

export default function Inicio() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', overflow: 'hidden' }}>

      {/* Exact Figma screenshot — 1080×1920 */}
      <img
        src="/assets/screens/inicio.png"
        alt=""
        draggable={false}
        style={{ position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', display: 'block', userSelect: 'none' }}
      />

      {/* Invisible tap area over "Iniciar" button (left=99, top=1581, w=882, h=133) */}
      <button
        onClick={() => navigate('/registro')}
        aria-label="Iniciar"
        style={{
          position: 'absolute', left: '99px', top: '1581px', width: '882px', height: '133px',
          background: 'transparent', border: 'none', cursor: 'pointer',
        }}
      />
    </div>
  )
}
