import React, { useEffect, useState} from "react";
import Button from '../Button/Button';
import Table from '../Table/Table';
import Paginador from "../Paginador/Paginador";
import Layout from '../Layout/Layout';
import './Admin.css';
import { showDeleteConfirmAlert, showSuccessAlert, showErrorAlert } from '../Alert/Alert';

function Admin() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const find = (evt) => {
        const {value} = evt.target;
        setQuery(value);
        setPageNumber(1);
    }

    const fetchData = async () => {
        try {
            let response = await fetch(`http://localhost:5052/User/${pageNumber}/5/roleAdmin?query=${query}`);
            if (!response.ok) {

                const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
                showErrorAlert(`Fallo al cargar usuarios: ${response.status} - ${errorData.message || 'Error del servidor'}`, 'warning');
                return; 
            }

            let json = await response.json();
            setUsers(json.users);
            setTotalPages(json.totalPages);

        } catch (error) {
            console.error("Error al obtener datos de usuarios:", error);
            showErrorAlert("Error al traer los usuarios. Verifica tu conexión o el estado del servicio.", 'error');
        } 
    }

    const deleteUser = async (userId) => {
        try {
            const userLogged = JSON.parse(localStorage.getItem('user'));
            const userLoggedId = userLogged?.id;
            
            let response = await fetch(`http://localhost:5052/User/${userId}/${userLoggedId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showSuccessAlert("Usuario eliminado exitosamente"); 
                fetchData();
            } else {
                showErrorAlert("Error al eliminar el usuario. El servidor rechazó la solicitud.");
            }
        } catch (error) {
            console.error("Error en la petición de eliminación:", error);
            showErrorAlert("Error de conexión. No se pudo completar la solicitud de eliminación.");
        }
    }

    useEffect(() => {
        fetchData();
    }, [pageNumber, query]);
    
    return (
       <div className="conteiner-primary">
            <Layout 
                title="Administadores" 
                searchValue={query} 
                searchFunc={find}
                placeholder="Buscar Administrador"
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
                                        <td className="acciones-btn">
                                            <Button 
                                                className="delete" 
                                                text="ELIMINAR" 
                                                callback={() => 
                                                    showDeleteConfirmAlert(() => deleteUser(user.id), 
                                                        '¿Borrar a ' + user.fullName + '?', 
                                                        "Esta acción es irreversible.")
                                                }
                                            />
                                            <a href={`/ban?userId=${user.id}`}>
                                                <Button text="BAN"/>
                                            </a>
                                            <a href={`/edit?userId=${user.id}`}>
                                                <Button text="EDITAR"/>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                
                <Paginador pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={totalPages}></Paginador>
            </Layout>
        </div>
    )
}

export default Admin;