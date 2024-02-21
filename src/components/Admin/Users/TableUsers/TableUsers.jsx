import React from 'react'
import './TableUsers.scss';
import { Table, Button, Icon, Label  } from 'semantic-ui-react';
import { map } from 'lodash';


export const TableUsers = (props) => {
  const { users, updateUser } = props;
  return (
     <Table className='table-users-admin'>
        <Table.Header>
          <Table.Row> 
            <Table.HeaderCell>UserName</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Apellido</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Activo</Table.HeaderCell>
            <Table.HeaderCell>Staff</Table.HeaderCell>
            <Table.HeaderCell>Acciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            map(users, (user, index) => (
              <Table.Row key={index}>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.first_name}</Table.Cell>
                <Table.Cell>{user.last_name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  {user.is_active ? 
                    <Label color='green'><Icon name='checkmark' />Activo</Label>  : <Label color='red'><Icon name='close'/> inactivo</Label>
                  }
                </Table.Cell>
                <Table.Cell>
                  {user.is_staff ? 
                    <Label color='green'><Icon name='checkmark' />Activo</Label>  : <Label color='red'><Icon name='close'/> inactivo</Label>
                  }
                </Table.Cell>
                {/* columna de acciones */}
                <Actions user={user} updateUser={updateUser}/>

              </Table.Row>
            ))
          }
        </Table.Body>
     </Table>
  );
}

/*componente para las columnas de acciones */
function Actions({user, updateUser}){
  return (
    <Table.Cell textAlign='right'>      
      <Button icon onClick={() => updateUser(user)}> <Icon name='edit' /> </Button>
      <Button icon negative onClick={() => console.log(`Eliminar usuario ${user.first_name}`)}> <Icon name='trash' /></Button>
    </Table.Cell>
  )
}