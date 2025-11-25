import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Button from "../Button/Button";

function Ban() {
    // BAN
    const [userId, setUserId] = useState("");
    const [reason, setReason] = useState("");
    const [banDate, setBanDate] = useState("");
    const [unbanDate, setUnbanDate] = useState("");

    // UNBAN
    const [unbanUserId, setUnbanUserId] = useState("");

    const handleBan = async () => {
        if (!userId || !reason || !banDate || !unbanDate) {
            alert("Todos los campos para banear son obligatorios");
            return;
        }

        const body = {
            userId: parseInt(userId),
            reason,
            banDate,
            unbanDate
        };

        try {
            let response = await fetch(`http://localhost:5052/Ban`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            response.ok
                ? alert("Usuario baneado correctamente")
                : alert("Error al banear el usuario");
        } catch (error) {
            alert("Error en la petición");
        }
    };

    const handleUnban = async () => {
        if (!unbanUserId) {
            alert("Debes ingresar el ID del usuario a desbanear");
            return;
        }

        const body = {
            userId: parseInt(unbanUserId)
        };

        try {
            let response = await fetch(`http://localhost:5052/Ban`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            response.ok
                ? alert("Usuario desbaneado correctamente")
                : alert("Error al desbanear el usuario");
        } catch (error) {
            alert("Error en la petición");
        }
    };

    return (
        <div>
            <NavBar />

            <h2>Banear Usuario</h2>
            <div style={{ display: "flex", flexDirection: "column", width: "300px", margin: "20px" }}>
                <label>ID del Usuario:</label>
                <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />

                <label>Motivo del Ban:</label>
                <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />

                <label>Fecha de Ban:</label>
                <input type="date" value={banDate} onChange={(e) => setBanDate(e.target.value)} />

                <label>Fecha de Desban:</label>
                <input type="date" value={unbanDate} onChange={(e) => setUnbanDate(e.target.value)} />

                <br />
                <Button text="Banear" callback={handleBan} />
            </div>

            <hr />

            <h2>Desbanear Usuario</h2>
            <div style={{ display: "flex", flexDirection: "column", width: "300px", margin: "20px" }}>
                <label>ID del Usuario:</label>
                <input
                    type="number"
                    value={unbanUserId}
                    onChange={(e) => setUnbanUserId(e.target.value)}
                />

                <br />
                <Button text="Desbanear" callback={handleUnban} />
            </div>
        </div>
    );
}

export default Ban;
