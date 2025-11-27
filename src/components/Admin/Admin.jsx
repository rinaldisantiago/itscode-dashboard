import React, { useEffect, useState} from "react";
import Button from '../Button/Button';
import Table from '../Table/Table';
import Paginador from "../Paginador/Paginador";
import Layout from '../Layout/Layout';
import './Admin.css';

function Admin() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [users, setUsers] = useState([]);

    const find = (evt) => {
        const {value} = evt.target;
        setQuery(value);
    }

    const fetchData = async () => {
        try {
            let response = await fetch(`http://localhost:5052/User/${pageNumber}/5/roleAdmin?query=${query}`);
            let json = await response.json();

            setUsers(json.users);
        } catch (error) {
            alert("Error al traer los usuarios");
        } finally {
            
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
                alert("Usuario eliminado exitosamente");
                fetchData();
            } else {
                alert("Error al eliminar el usuario");
            }
        } catch (error) {
            alert("Error al eliminar el usuario");
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
                                            <Button className="delete" text="ELIMINAR" callback={() => deleteUser(user.id)}/>
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
                
                <Paginador pageNumber={pageNumber} setPageNumber={setPageNumber}></Paginador>
            </Layout>
        </div>
    )
}

export default Admin;