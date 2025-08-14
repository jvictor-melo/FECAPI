import React, { useState } from 'react';
import Janela from '../../components/janela/Janela';

function Campeonato () {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>
                Criar campeonato
            </button>

            <Janela isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Cadastrar campeonato</h2>
                <p>Conteúdo personalizado pode ser colocado aqui.</p>
            </Janela>
        </div>
    );
};

export default Campeonato;
