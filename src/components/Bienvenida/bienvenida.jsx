import React from "react";
import './bienvenida.css';

function Bienvenida() {
    return (
        <div class="contenedor-general">
                <header class="topbar">
                    <div class="logo">&lt;/&gt; ITSCode</div>
                </header>

                <main class="container">
                    <section class="hero">
                    <h1>Bienvenido a <span class="gradient">ITSCode</span></h1>
                    <p>Al administrador de tu sistema.</p>
                    </section>

                    <section class="card-login">
                    <h2>Ingresá a tu cuenta</h2>
                    <p>Accedé con tu cuenta ADMIN.</p>

                    <div class="buttons">
                        <a class="btn btn-primary" href="/login">Iniciar sesión</a>
                    </div>
                    </section>
                </main>
        </div>
    )
}

export default Bienvenida;