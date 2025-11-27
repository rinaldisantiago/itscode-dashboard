import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Button from "../Button/Button";
import { useSearchParams } from "react-router-dom";

function Editar() {
    const [searchParams] = useSearchParams();
    const [userId, setUserId] = useState("");
    const [roleId, setRoleId] = useState("");

    useEffect(() => {
        const idFromUrl = searchParams.get("userId");
        if (idFromUrl) {
            setUserId(idFromUrl);
        }
    }, [searchParams]);

    const handleEditRole = async () => {
        if (!userId || !roleId) {
            alert("Debes completar ambos campos");
            return;
        }

        const body = {
            id: parseInt(userId),
            idRole: parseInt(roleId)
        };

        try {
            let response = await fetch(`http://localhost:5052/User/updateUserRole`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            response.ok
                ? alert("Rol actualizado correctamente")
                : alert("Error al actualizar el rol");
        } catch (error) {
            alert("Error en la petición");
        }
    };

    return (
        <div>
            <NavBar />

            <h2>Editar Rol del Usuario</h2>

            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
                margin: "20px"
            }}>
                <label>ID del Usuario:</label>
                <input 
                    type="number" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                />

                <label>ID del Rol:</label>
                <input 
                    type="number" 
                    value={roleId} 
                    onChange={(e) => setRoleId(e.target.value)} 
                />

                <br />
                <Button text="Actualizar Rol" callback={handleEditRole} />
            </div>
        </div>
    );
}

export default Editar;
