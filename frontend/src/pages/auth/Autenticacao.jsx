import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../../components/autenticar/login";
import Register from "../../components/autenticar/register";
import "./styles.css";

function Autenticacao({ setIsLoggedIn }) {
  return (
    <>
        <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    </>
  );
}

export default Autenticacao;