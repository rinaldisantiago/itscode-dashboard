import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Button from "../Button/Button";
import "./Editar.css";

function Editar() {
    const [userId, setUserId] = useState("");
    const [roleId, setRoleId] = useState("");

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

            <div className="edit-container">
                <div className="edit-card">
                    <h2 className="edit-title">Editar Rol del Usuario</h2>

                    <label>ID del Usuario:</label>
                    <input
                        className="edit-input"
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />

                    <label>Rol:</label>
                    <input
                        className="edit-input"
                        type="text"
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                    />

                    <button className="edit-btn" onClick={handleEditRole}>
                        Actualizar Rol
                    </button>
                </div>
           </div>
        </div>
    );
}

export default Editar;
