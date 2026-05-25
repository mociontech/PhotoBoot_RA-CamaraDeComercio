import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Loader() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/resultado'), 4000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', overflow: 'hidden' }}>

      <img
        src="/assets/screens/loader.png"
        alt=""
        draggable={false}
        style={{ position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', display: 'block', userSelect: 'none' }}
      />

      {/* Spinner animado sobre la posición del ícono estático (left=341, top=538, w=397, h=397) */}
      <div style={{
        position: 'absolute', left: '341px', top: '538px', width: '397px', height: '397px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '160px', height: '160px',
          border: '16px solid rgba(51,51,51,0.15)',
          borderTop: '16px solid #333',
          borderRadius: '50%',
          animation: 'loaderSpin 1s linear infinite',
        }} />
      </div>

      <style>{`
        @keyframes loaderSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
