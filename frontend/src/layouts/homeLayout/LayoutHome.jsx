import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Competidores from "../competidores/Competidores";
import Campeonato from "../campeonato/Campeonatos";
import Relatorio from "../relatorio/Relatorio";
import Menu from "../../components/menu/Menu";

function LayoutHome () {
    return (
        <>
            <main className="container-main">
                <Router>
                    <Menu />
                    <div id='container-dinamico'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/competidores" element={<Competidores />} />
                            <Route path="/campeonato" element={<Campeonato />} />
                            <Route path="/relatorios" element={<Relatorio />} />
                        </Routes>
                    </div>
                </Router>
            </main>
        </>
    )
}

export default LayoutHome;