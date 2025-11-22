import React, { use } from "react";
import Paginado from './components/Paginador/Paginador';
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

    return (
        <>
            <Button text="Anterior" callback={anterior}/>
            <Label text={pageNumber}/>
            <Button text="Siguiente" callback={siguiente}/>
        </>
    )


    const find = (evt) => {
        const {value} = evt.target;
        setQuery(value);
    }

    const fetchData = async () => {
        try {
            let response = await fetch(`'http://localhost:5052/User/${pageNumber}/5'`);
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
            USERS
        </div>
    )
}

export default Users;