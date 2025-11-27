import React, { useEffect, useState} from "react";
import Button from '../Button/Button';
import NavBar from '../NavBar/NavBar';
import Table from '../Table/Table';
import Paginador from "../Paginador/Paginador";
import './Users.css';

function Users() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [users, setUsers] = useState([]);

    const find = (evt) => {
        const {value} = evt.target;
        setQuery(value);
    }

    const fetchData = async () => {
        try {
            let response = await fetch(`http://localhost:5052/User/${pageNumber}/5/roleUser?query=${query}`);
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
            const idUserLogger = userLogged?.id;
            
            let response = await fetch(`http://localhost:5052/User?id=${userId}&idUserLogger=${idUserLogger}`, {
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
            <NavBar> </NavBar>
            <h2>Usuarios</h2>
            <div className="search">
                <input  type="text" value={query} onChange = {find}/>
            </div>

            <Table>
                <tbody>
                    {
                        users.map((user) =>{
                            return(
                                <tr>
                                    <td scope="row">{user.id}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.banned ? "Baneado" : "Activo"}</td>
                                    <td>
                                        <Button className="delete" text="ELIMINAR" callback={() => deleteUser(user.id)}/>
                                    </td>
                                    <td>
                                        <a href={`/ban?userId=${user.id}`}>
                                            <Button text="BAN"/>
                                        </a>
                                    </td>
                                    <td>
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
            
        </div>
    )
}

export default Users;