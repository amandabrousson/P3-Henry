import './App.css'
import NavBar from "../components/NavBar/NavBar"
import HomeList from '../views/Home/HomeList';
import { Routes, Route } from "react-router-dom";
import Sobrentros from '../views/sobrenosotros/Sobrentros';
import MisTurnos from '../views/Mis turnos/MisTurnos';
import Contacto from '../views/contacto/Contacto';
import Registro from '../views/Registro/Registro';
import LogIn from '../views/Registro/LogIn';
import ErrorPage from '../components/errors';
import CreateTurnos from '../components/Turnos/CreateTurnos';
import Perfil from '../components/userMenu/Perfil';


function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeList />} />
        <Route path="/Home" element={<HomeList />} />
        <Route path="/SobreNosotros" element={<Sobrentros />} />
        <Route path="/MisTurnos" element={<MisTurnos />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Login" element={<LogIn />} />
        <Route path="/CreateTurnos" element={<CreateTurnos />} />
        <Route path="/Perfil" element={<Perfil />} />

        <Route path='*' element={<ErrorPage />} />
      </Routes>

    </div>
  );
}

export default App;
