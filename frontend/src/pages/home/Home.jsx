import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Competidores from "../../layouts/competidores/Competidores";
import Categoria from "../../layouts/categoria/categoria";
import Campeonato from "../../layouts/campeonato/Campeonatos";
import Inicio from "../../layouts/inicio/Inicio";
import Relatorio from "../../layouts/relatorio/Relatorio";
import Menu from "../../components/menu/Menu";



function Home () {
    return (
        <>
            <main className="container-main">
                <Router>
                    <Menu />
                    <div id='container-dinamico'>
                        <Routes>
                            <Route path="/" element={<Inicio />} />
                            <Route path="/competidores" element={<Competidores />} />
                            <Route path="/categoria" element={<Categoria />} />
                            <Route path="/campeonato" element={<Campeonato />} />
                            <Route path="/relatorios" element={<Relatorio />} />
                        </Routes>
                    </div>
                </Router>
            </main>
        </>
    )
};

export default Home;