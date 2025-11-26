import React, { useEffect, useState} from "react";
import Button from '../Button/Button';
import Label from '../Label/Label';
import NavBar from '../NavBar/NavBar';
import Table from '../Table/Table';
import Paginador from "../Paginador/Paginador";

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
            let response = await fetch(`http://localhost:5052/User/(User/${pageNumber}/5?query=${query}`);
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
        <div>
            <NavBar> </NavBar>
            <input type="text" value={query} onChange = {find}/>

            <Table>
                
                <tbody>
                    {
                        users.map((user) =>{
                            return(
                                <tr>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.fullName}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.banned ? "Baneado" : "Activo"}</td>
                                    <td>
                                        <Button text="ELIMINAR" callback={() => deleteUser(user.id)}/>

                                    </td>
                                    <td>
                                        <a href="/ban">
                                            <Button text="BANEAR"/>
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