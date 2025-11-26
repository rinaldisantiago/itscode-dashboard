import './Paginador.css';
import Button from '../Button/Button';
import Label from '../Label/Label';

import React from 'react'

const Paginador = ({pageNumber, setPageNumber}) => {

    const anterior = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    const siguiente = () => {
        if (pageNumber < 10) {
            setPageNumber(pageNumber + 1);
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