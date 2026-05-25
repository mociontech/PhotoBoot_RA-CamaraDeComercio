import { useNavigate } from 'react-router-dom'

export default function Agradecimiento() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', overflow: 'hidden' }}>

      <img
        src="/assets/screens/agradecimiento.png"
        alt=""
        draggable={false}
        style={{ position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', display: 'block', userSelect: 'none' }}
      />

      {/* Tap area "Finalizar" (left=198, top=1680, w=684, h=133) */}
      <button
        onClick={() => navigate('/')}
        aria-label="Finalizar"
        style={{
          position: 'absolute', left: '198px', top: '1680px', width: '684px', height: '133px',
          background: 'transparent', border: 'none', cursor: 'pointer',
        }}
      />
    </div>
  )
}
