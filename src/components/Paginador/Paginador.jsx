import './Paginador.css';
import Button from '../Button/Button';
import Label from '../Label/Label';

import React, { useState } from 'react'

const Paginador = ({text}) => {
    
    const [pageNumber, setPageNumber] = useState(1);

    const anterior = () => {
        let numero = pageNumber;
        if (numero > 1) {
            numero--;
            setPageNumber(numero);
        }
    }

    const siguiente = () => {
        let numero = pageNumber;
        if (numero < 10) {
            numero++;
            setPageNumber(numero);
        }
    }

    return (
        <>
            <Button text="Anterior" callback={anterior}/>
            <Label text={pageNumber}/>
            <Button text="Siguiente" callback={siguiente}/>
        </>
    )
}

export default Paginador;