import React, { use, useEffect, useState} from "react";
import Button from '../Button/Button';
import Label from '../Label/Label';

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
            let response = await fetch(`http://localhost:5052/User/${pageNumber}/5/1?query=${query}`);
            let json = await response.json();

            setUsers(json.users);
        } catch (error) {
            alert("Error al traer los usuarios");
        } finally {
            
        }
    }


    useEffect(() => {
        fetchData();
    }, [pageNumber, query]);
    
    return (
        <div>
            <input type="text" value={query} onChange = {find}/>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre Completo</th>
                        <th scope="col">Nombre de Usuario</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) =>{
                            return(
                                <tr>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.fullName}</td>
                                    <td>{user.userName}</td>
                                    <td>EDITAR</td>
                                    <td>ELIMINAR</td>
                                    <td>BANEAR</td>

                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>

            <Button text="Anterior" callback={anterior}/>
            <Label text={pageNumber}/>
            <Button text="Siguiente" callback={siguiente}/>
        </div>
    )
}

export default Users;