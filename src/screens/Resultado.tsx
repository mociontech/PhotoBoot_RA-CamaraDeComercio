import { useNavigate } from 'react-router-dom'

export default function Resultado() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', overflow: 'hidden' }}>

      <img
        src="/assets/screens/resultado.png"
        alt=""
        draggable={false}
        style={{ position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', display: 'block', userSelect: 'none' }}
      />

      {/* Tap area "Continuar" (left=140, top=1740, w=800, h=120) */}
      <button
        onClick={() => navigate('/agradecimiento')}
        aria-label="Continuar"
        style={{
          position: 'absolute', left: '140px', top: '1740px', width: '800px', height: '120px',
          background: 'transparent', border: 'none', cursor: 'pointer',
        }}
      />
    </div>
  )
}
