import React from "react";
import './Error.css';

function Error() {
    return (
        <div className="errorContainer">
            <h1 className="errorMessage">Tranqui, solo es un error...</h1>
            <div className="imageConteiner">
                <img src="/deadpool.png" alt="Error" />
            </div>
        </div>
    )
}

export default Error;