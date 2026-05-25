import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const imgPolygon1 = 'https://www.figma.com/api/mcp/asset/4a407757-442c-4cb9-ae9a-d618dd0ec8af'
const imgPolygon2 = 'https://www.figma.com/api/mcp/asset/8eea2ba1-e6af-445b-a2ba-ca1d38ce49ff'
const imgLogoGroup = 'https://www.figma.com/api/mcp/asset/ff7b0ac5-8b93-45c7-8542-9555b381ebf7'
const imgEstadio1 = 'https://www.figma.com/api/mcp/asset/1e3b115d-45a0-4db7-8a0d-a6f8c034fcce'  // estadio1
const imgEstadio2 = 'https://www.figma.com/api/mcp/asset/6e03fd26-dfcb-44f0-af7b-ae782c0adc91'  // estadio2
const imgMocionLogo = 'https://www.figma.com/api/mcp/asset/c1125652-ebb2-49b2-a8a5-7e9ca3c23af9'

const fondos = [
  { id: 1, label: 'Estadio 1', src: imgEstadio1 },
  { id: 2, label: 'Estadio 2', src: imgEstadio2 },
]

export default function SeleccionFondo() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#6fcfea' }}
    >
      {/* Decorative polygons */}
      <div
        style={{
          position: 'absolute',
          left: '-510px',
          top: '438px',
          width: '1313px',
          height: '1275px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ transform: 'rotate(-20.1deg)', flexShrink: 0 }}>
          <img alt="" src={imgPolygon1} style={{ width: '1040px', height: '976px', display: 'block' }} />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '344px',
          top: '438px',
          width: '1210px',
          height: '1209px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ transform: 'rotate(16.01deg)', flexShrink: 0 }}>
          <img alt="" src={imgPolygon2} style={{ width: '979px', height: '977px', display: 'block' }} />
        </div>
      </div>

      {/* Logo */}
      <div style={{ position: 'absolute', left: '99px', top: '95px', height: '43px', width: '147px' }}>
        <img alt="Mocion" src={imgMocionLogo} style={{ height: '100%', width: 'auto', display: 'block' }} />
        <img alt="" src={imgLogoGroup} style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 'auto', display: 'block' }} />
      </div>

      {/* Mocion brand text (top-right) */}
      <div
        style={{
          position: 'absolute',
          right: '60px',
          top: '40px',
          fontFamily: '"Nunito", "Proxima Nova", sans-serif',
          fontWeight: 700,
          fontSize: '72px',
          color: '#232e2e',
        }}
      >
        Mocion
      </div>

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '390px',
          textAlign: 'center',
          fontFamily: '"Bungee", sans-serif',
          fontSize: '100px',
          lineHeight: '90px',
          color: '#2d2d2d',
        }}
      >
        <p style={{ margin: 0 }}>Selecciona</p>
        <p style={{ margin: 0 }}>un fondo</p>
      </div>

      {/* Background thumbnails */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '670px',
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        {fondos.map((fondo) => (
          <button
            key={fondo.id}
            onClick={() => setSelected(fondo.id)}
            style={{
              width: '400px',
              height: '580px',
              borderRadius: '24px',
              border: selected === fondo.id ? '8px solid #232e2e' : '4px solid transparent',
              overflow: 'hidden',
              padding: 0,
              cursor: 'pointer',
              background: 'transparent',
              transition: 'border 0.2s',
              boxSizing: 'border-box',
              flexShrink: 0,
            }}
          >
            <img
              src={fondo.src}
              alt={fondo.label}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </button>
        ))}
      </div>

      {/* Continuar button */}
      <button
        onClick={() => navigate('/contador')}
        style={{
          position: 'absolute',
          left: '112px',
          top: '1456px',
          width: '855px',
          height: '133px',
          background: '#2d2d2d',
          borderRadius: '24px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: selected !== null ? 1 : 0.5,
        }}
      >
        <span
          style={{
            fontFamily: '"Roboto", sans-serif',
            fontWeight: 700,
            fontSize: '65px',
            color: '#fff',
          }}
        >
          Continuar
        </span>
      </button>
    </div>
  )
}
