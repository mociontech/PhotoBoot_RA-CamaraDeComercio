import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import ScaleWrapper from './ScaleWrapper'
import Inicio from './screens/Inicio'
import Registro from './screens/Registro'
import Instrucciones from './screens/Instrucciones'
import SeleccionFondo from './screens/SeleccionFondo'
import Contador from './screens/Contador'
import Loader from './screens/Loader'
import Resultado from './screens/Resultado'
import Agradecimiento from './screens/Agradecimiento'

export default function App() {
  return (
    <HashRouter>
      <ScaleWrapper>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/instrucciones" element={<Instrucciones />} />
          <Route path="/seleccion-fondo" element={<SeleccionFondo />} />
          <Route path="/contador" element={<Contador />} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/agradecimiento" element={<Agradecimiento />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ScaleWrapper>
    </HashRouter>
  )
}
