import React, { useEffect, useState } from "react";
import Button from '../Button/Button';
import Table from '../Table/Table';
import Paginador from "../Paginador/Paginador";
import Layout from '../Layout/Layout'; 
import './Users.css';
import { showDeleteConfirmAlert, showSuccessAlert, showErrorAlert } from '../Alert/Alert';

function Users() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [users, setUsers] = useState([]);

    const find = (evt) => {
        const { value } = evt.target;
        setQuery(value);
    }

    const fetchData = async () => {
    try {
        let response = await fetch(`http://localhost:5052/User/${pageNumber}/5/roleUser?query=${query}`);
        
        let json = await response.json();
        setUsers(json.users);
        
    } catch (error) {
        console.error("Error al obtener datos de usuarios:", error);
        showErrorAlert("Error al traer los usuarios. Verifica tu conexión o el estado del servidor.");
    }
}

    const deleteUser = async (userId) => {
    try {
        const userLogged = JSON.parse(localStorage.getItem('user'));
        const idUserLogger = userLogged?.id;
        
        let response = await fetch(`http://localhost:5052/User?id=${userId}&idUserLogger=${idUserLogger}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchData();
        
        } else {
            showErrorAlert("Error al eliminar el usuario. El servidor rechazó la solicitud.");
        }
    } catch (error) {
        console.error("Error en la petición de eliminación:", error);
        showErrorAlert("Error de conexión. No se pudo conectar con el servicio de eliminación.");
    }
}

    useEffect(() => {
        fetchData();
    }, [pageNumber, query]); 
    
    return (
        <div className="conteiner-primary">
            <Layout 
                title="Usuarios" 
                searchValue={query} 
                searchFunc={find}
            >
                <Table>
                    <tbody>
                        {
                            users.map((user) => {
                                return(
                                    <tr key={user.id}>
                                        <td scope="row">{user.id}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.banned ? "Baneado" : "Activo"}</td>
                                        <td>
                                            <Button 
                                                className="delete" 
                                                text="ELIMINAR" 
                                                callback={() => 
                                                    showDeleteConfirmAlert(() => deleteUser(user.id), 
                                                        '¿Borrar a ' + user.fullName + '?', 
                                                        "Esta acción es irreversible.")
                                                }
                                            />
                                        </td>
                                        <td>
                                            <a href="/ban">
                                                <Button text="BAN"/>
                                            </a>
                                        </td>
                                        <td>
                                            <a href="/edit">
                                                <Button text="EDITAR"/>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                
                <Paginador pageNumber={pageNumber} setPageNumber={setPageNumber}></Paginador>
            </Layout>
        </div>
    )
}

export default Users;