import './Input.css';

import React from 'react'


const Input = ({value, onChange}) => {    
    return (
        <input className='input-search' type="text" value={value} onChange={onChange}/>
    )
}

export default Input;