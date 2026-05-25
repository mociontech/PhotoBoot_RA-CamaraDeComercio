import { type CSSProperties, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Assets — Figma node 87:187
const imgPolygon1    = 'https://www.figma.com/api/mcp/asset/e23efb98-ec29-4d7e-8cbc-1303721b8d26'
const imgPolygon2    = 'https://www.figma.com/api/mcp/asset/965044ce-00ce-4e8e-8270-e618e2217d75'
const imgLogoSmall   = 'https://www.figma.com/api/mcp/asset/7a42c040-8933-4e8b-ab12-b6cb666c4880' // Group1000005785
const imgBrandMark   = 'https://www.figma.com/api/mcp/asset/96b1cf28-7d17-41a0-9618-d2ddc032533f' // Mocion
const imgBrandText   = 'https://www.figma.com/api/mcp/asset/5790c5f8-80e4-4365-b7ca-614b522857b1' // Experience Tech
const imgIconNombre  = 'https://www.figma.com/api/mcp/asset/6b9bf5a2-e38d-4127-a9cc-e625f30a9b7f' // Vector — person
const imgIconEmpresa = 'https://www.figma.com/api/mcp/asset/b2a499b7-8bb3-4dfa-9bd7-df04e81b5217' // Group214 — building
const imgIconCorreo  = 'https://www.figma.com/api/mcp/asset/50e9e584-2235-4619-ba9e-572aaea712fa' // Union — phone
const imgIconCelular = 'https://www.figma.com/api/mcp/asset/2e107bec-2b16-4b17-8a43-f69f8640fd25' // Union1 — mail
const imgDot         = 'https://www.figma.com/api/mcp/asset/f47e5847-aa4f-46e8-8f83-9de2e9b8599c' // Ellipse7

const inputStyle: CSSProperties = {
  position: 'absolute', left: '143px', top: 0, width: 'calc(100% - 143px)', height: '100%',
  background: 'transparent', border: 'none', outline: 'none',
  fontFamily: '"Roboto", sans-serif', fontWeight: 400, fontSize: '50px',
  color: '#1e1e1e', caretColor: '#1e1e1e',
}
const placeholderStyle: CSSProperties = {
  position: 'absolute', left: '143px', top: '50%', transform: 'translateY(-50%)',
  fontFamily: '"Roboto", sans-serif', fontWeight: 400, fontSize: '50px',
  color: 'rgba(35,46,46,0.4)', pointerEvents: 'none',
}

export default function Registro() {
  const navigate = useNavigate()
  const [nombre, setNombre]   = useState('')
  const [empresa, setEmpresa] = useState('')
  const [correo, setCorreo]   = useState('')
  const [celular, setCelular] = useState('')

  return (
    <div style={{ position: 'relative', width: '1080px', height: '1920px', background: '#82ea6f', overflow: 'hidden' }}>

      {/* Polygon 1 */}
      <div style={{ position: 'absolute', left: '-783px', top: '-92px', width: '1859px', height: '1859px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ transform: 'rotate(23.2deg)', flexShrink: 0 }}>
          <div style={{ position: 'relative', width: '1416px', height: '1416px' }}>
            <img alt="" src={imgPolygon1} style={{ position: 'absolute', top: 0, left: '34.7px', width: '1347px', height: '1281px', display: 'block' }} />
          </div>
        </div>
      </div>

      {/* Polygon 2 */}
      <div style={{ position: 'absolute', left: '-155px', top: '-135px', width: '2107px', height: '2107px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ transform: 'rotate(23.2deg)', flexShrink: 0 }}>
          <div style={{ position: 'relative', width: '1604px', height: '1604px' }}>
            <img alt="" src={imgPolygon2} style={{ position: 'absolute', top: 0, left: '39.3px', width: '1525px', height: '1451px', display: 'block' }} />
          </div>
        </div>
      </div>

      {/* Nav logo — top-left */}
      <img alt="" src={imgLogoSmall} style={{ position: 'absolute', left: '98px', top: '95px', width: '147px', height: '43px', display: 'block' }} />

      {/* Mocion brand mark */}
      <img alt="" className="slide-in-down"    src={imgBrandMark} style={{ position: 'absolute', left: '219px', top: '397px', width: '642px', height: '119px', display: 'block' }} />

      {/* Experience Tech */}
      <img alt="" className="slide-in-down d1" src={imgBrandText} style={{ position: 'absolute', left: '219px', top: '535px', width: '642px', height: '63px', display: 'block' }} />

      {/* REGISTRO title */}
      <div className="slide-in-left d2" style={{
        position: 'absolute', left: '99px', top: '719px', width: '882px', height: '78px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Bungee", sans-serif', fontSize: '97px', lineHeight: 'normal',
        color: '#232e2e', textAlign: 'center',
      }}>
        REGISTRO
      </div>

      {/* ── Input: Tu nombre ── top=881 */}
      <div className="input-row slide-in-right d2" style={{ position: 'absolute', left: '98px', top: '881px', width: '882px', height: '99px', background: 'rgba(255,255,255,0.15)', borderRadius: '24px', boxSizing: 'border-box', overflow: 'hidden' }}>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} style={inputStyle} />
        {!nombre && <span style={placeholderStyle}>Tu nombre</span>}
      </div>
      <img alt="" src={imgIconNombre}  style={{ position: 'absolute', left: '135px', top: '904px',  width: '52px', height: '52px', display: 'block', pointerEvents: 'none' }} />
      <img alt="" src={imgDot}         style={{ position: 'absolute', left: '213px', top: '930px',  width: '12px', height: '12px', display: 'block', pointerEvents: 'none' }} />

      {/* ── Input: Tu empresa ── top=1013 */}
      <div className="input-row slide-in-right d3" style={{ position: 'absolute', left: '98px', top: '1013px', width: '882px', height: '99px', background: 'rgba(255,255,255,0.15)', borderRadius: '24px', boxSizing: 'border-box', overflow: 'hidden' }}>
        <input type="text" value={empresa} onChange={e => setEmpresa(e.target.value)} style={inputStyle} />
        {!empresa && <span style={placeholderStyle}>Tu empresa</span>}
      </div>
      <img alt="" src={imgIconEmpresa} style={{ position: 'absolute', left: '138px', top: '1032px', width: '54px', height: '63px', display: 'block', pointerEvents: 'none' }} />
      <img alt="" src={imgDot}         style={{ position: 'absolute', left: '213px', top: '1058px', width: '12px', height: '12px', display: 'block', pointerEvents: 'none' }} />

      {/* ── Input: Tu correo ── top=1145 */}
      <div className="input-row slide-in-right d4" style={{ position: 'absolute', left: '98px', top: '1145px', width: '882px', height: '99px', background: 'rgba(255,255,255,0.15)', borderRadius: '24px', boxSizing: 'border-box', overflow: 'hidden' }}>
        <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} style={inputStyle} />
        {!correo && <span style={placeholderStyle}>Tu correo</span>}
      </div>
      <img alt="" src={imgIconCorreo}  style={{ position: 'absolute', left: '135px', top: '1156px', width: '47px', height: '78px', display: 'block', pointerEvents: 'none' }} />
      <img alt="" src={imgDot}         style={{ position: 'absolute', left: '213px', top: '1191px', width: '12px', height: '12px', display: 'block', pointerEvents: 'none' }} />

      {/* ── Input: Tu celular ── top=1277 */}
      <div className="input-row slide-in-right d5" style={{ position: 'absolute', left: '98px', top: '1277px', width: '882px', height: '99px', background: 'rgba(255,255,255,0.15)', borderRadius: '24px', boxSizing: 'border-box', overflow: 'hidden' }}>
        <input type="tel" value={celular} onChange={e => setCelular(e.target.value)} style={inputStyle} />
        {!celular && <span style={placeholderStyle}>Tu celular</span>}
      </div>
      <img alt="" src={imgIconCelular} style={{ position: 'absolute', left: '131px', top: '1305px', width: '61px', height: '48px', display: 'block', pointerEvents: 'none' }} />
      <img alt="" src={imgDot}         style={{ position: 'absolute', left: '213px', top: '1323px', width: '12px', height: '12px', display: 'block', pointerEvents: 'none' }} />

      {/* Comenzar button — center, top=1565 */}
      <button
        className="kiosk-btn btn-pulse"
        onClick={() => navigate('/instrucciones')}
        style={{
          position: 'absolute', left: '198px', top: '1565px', width: '684px', height: '133px',
          background: '#232e2e', borderRadius: '66.5px', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800, fontSize: '65px', color: '#fff', lineHeight: 1 }}>
          Comenzar
        </span>
      </button>
    </div>
  )
}
