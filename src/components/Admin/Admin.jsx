import React, { useEffect, useState} from "react";
import Button from '../Button/Button';
import Label from '../Label/Label';
import NavBar from '../NavBar/NavBar';
import Table from '../Table/Table';
<<<<<<< HEAD

function Users() {
=======
import Paginador from "../Paginador/Paginador";

function Admin() {
>>>>>>> f9ccc5738485810abe779b6104b95c94751e8a70
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

<<<<<<< HEAD
    const banUser = async (userId) => {
        try {
            let response = await fetch(`http://localhost:5052/User/${userId}/ban`, {
                method: 'POST'
            });
            if (response.ok) {
                alert("Usuario baneado exitosamente");
                fetchData();
            } else {
                alert("Error al banear el usuario");
            }
        } catch (error) {
            alert("Error al banear el usuario");
        }
    }

=======
>>>>>>> f9ccc5738485810abe779b6104b95c94751e8a70
    useEffect(() => {
        fetchData();
    }, [pageNumber, query]);
    
    return (
        <div>
            <NavBar> </NavBar>
            <input type="text" value={query} onChange = {find}/>
<<<<<<< HEAD
            <Table>
=======

            <Table>
                
>>>>>>> f9ccc5738485810abe779b6104b95c94751e8a70
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
<<<<<<< HEAD
                                    </td>
                                    <td>
                                        <Button text="BANEAR" callback={() => banUser(user.id)}/>
                                    </td>
=======
>>>>>>> f9ccc5738485810abe779b6104b95c94751e8a70

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
<<<<<<< HEAD

            </Table>
            
            

            <Button text="Anterior" callback={anterior}/>
            <Label text={pageNumber}/>
            <Button text="Siguiente" callback={siguiente}/>
=======
            </Table>
            <Paginador pageNumber={pageNumber} setPageNumber={setPageNumber}></Paginador>
>>>>>>> f9ccc5738485810abe779b6104b95c94751e8a70
        </div>
    )
}

<<<<<<< HEAD
export default Users;
=======
export default Admin;
>>>>>>> f9ccc5738485810abe779b6104b95c94751e8a70
