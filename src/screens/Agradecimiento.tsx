import { useNavigate } from 'react-router-dom'

const imgLogoBrands = 'https://www.figma.com/api/mcp/asset/d50df64c-27e5-405f-b39a-57b04c4b525f'
const imgLogoGroup = 'https://www.figma.com/api/mcp/asset/5af7c117-3f90-4985-ad36-131a5d390077'
const imgLogoText = 'https://www.figma.com/api/mcp/asset/f44f8359-45bf-4f13-b974-36360cabc15c'
const imgQR = 'https://www.figma.com/api/mcp/asset/2df2c57e-1f8c-4cb1-9b2d-c2c001346083'

export default function Agradecimiento() {
  const navigate = useNavigate()

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#efefef' }}
    >
      {/* Top bar icons */}
      <div
        style={{
          position: 'absolute',
          left: '99px',
          top: '54px',
          height: '43px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <img alt="Mocion" src={imgLogoGroup} style={{ height: '100%', width: 'auto', display: 'block' }} />
        <img alt="" src={imgLogoText} style={{ height: '100%', width: 'auto', display: 'block' }} />
      </div>

      {/* Mocion brand text */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: '220px', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: '"Nunito", "Proxima Nova", sans-serif',
            fontWeight: 800,
            fontSize: '130px',
            lineHeight: '108px',
            color: '#ff006a',
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

      {/* Thank you text */}
      <div
        style={{
          position: 'absolute',
          left: '108px',
          top: '700px',
          width: '864px',
          textAlign: 'center',
          fontFamily: '"Nunito", "Proxima Nova", sans-serif',
          fontWeight: 800,
          fontSize: '110px',
          lineHeight: '108px',
          color: '#333',
        }}
      >
        ¡Gracias por participar!
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          left: '214px',
          top: '1060px',
          width: '652px',
          textAlign: 'center',
          fontFamily: '"Nunito", "Proxima Nova", sans-serif',
          fontWeight: 400,
          fontSize: '48px',
          lineHeight: '53px',
          color: '#333',
        }}
      >
        Descarga tu imagen{' '}
        <strong>escaneando el siguiente código QR.</strong>
      </div>

      {/* QR Code */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '1211px',
          transform: 'translateX(-50%)',
          width: '350px',
          height: '350px',
          background: '#fff',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        <img
          alt="QR Code"
          src={imgQR}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Finalizar button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          left: '198px',
          top: '1680px',
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
          Finalizar
        </span>
      </button>
    </div>
  )
}
