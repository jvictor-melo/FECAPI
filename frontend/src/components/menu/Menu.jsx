import { Link } from "react-router-dom";
import "./styles.css";


function Menu () {
    const infoMenu = [
        {id: 1, paginas: "/", h2: "Home"},
        {id: 2, paginas: "/competidores", h2: "Competidores"},
        {id: 2, paginas: "/categoria", h2: "Categoria"},
        {id: 3, paginas: "/campeonato", h2: "Campeonato"},
        {id: 4, paginas: "/relatorios", h2: "Relatorios"},
        {id: 5, paginas: "/sair", h2: "Sair"}
    ];


    return (
        <div id="container-menu">
            {infoMenu.map((infoMenu =>( 
                <Link className="link-menu" to={infoMenu.paginas}>
                    <div key={infoMenu.id} className="info-menu">
                        {infoMenu.h2}
                    </div>
                </Link> 
            )))}
        </div>
    );
};

export default Menu;