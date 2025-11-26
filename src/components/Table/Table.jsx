import React, { PureComponent } from 'react'
import './Table.css'

export class Table extends PureComponent {
  render() {
    return (
      <div>
        <table class="tabla">
                <thead class="thead-dark">
                    <tr className='tr'>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre Completo</th>
                        <th scope="col">Nombre de Usuario</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                {this.props.children}

            </table>
      </div>
    )
  }
}

export default Table
