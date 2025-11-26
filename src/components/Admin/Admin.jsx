import React, { useEffect, useState} from "react";
import Button from '../Button/Button';
import Label from '../Label/Label';
import NavBar from '../NavBar/NavBar';
import Table from '../Table/Table';

function Users() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [users, setUsers] = useState([]);


    const anterior = () => {
        let numero = pageNumber;
        if (numero > 1) {
            numero--;
            setPageNumber(numero);
        }
    }

    const siguiente = () => {
        let numero = pageNumber;
        if (numero < 10) {
            numero++;
            setPageNumber(numero);
        }
    }
    const find = (evt) => {
        const {value} = evt.target;
        setQuery(value);
    }

    const fetchData = async () => {
        try {
            let response = await fetch(`http://localhost:5052/User/(Admin/${pageNumber}/5?query=${query}`);
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

    useEffect(() => {
        fetchData();
    }, [pageNumber, query]);
    
    return (
        <div>
            <NavBar></NavBar>
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
                                        <Button text="BANEAR" callback={() => banUser(user.id)}/>
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>

            </Table>
            
            

            <Button text="Anterior" callback={anterior}/>
            <Label text={pageNumber}/>
            <Button text="Siguiente" callback={siguiente}/>
        </div>
    )
}

export default Users;