import React from 'react';
import { Table } from 'antd';
import './TableUsers.scss';
import { Icon, Button, Label } from 'semantic-ui-react';

export const TableUsers = (props) => {
  const { users, updateUser } = props;

  const columns = [
    {
      title: 'Num_empleado',
      dataIndex: 'username',
    },
    {
      title: 'Nombre',
      dataIndex: 'first_name',
    },
    {
      title: 'Apellido',
      dataIndex: 'last_name',
      sorter: true,
      render: (last_name) => `${last_name}`,
    },
    {
      title: 'Puesto',
      dataIndex: 'workstation',
    },
    {
      title: 'Rango',
      dataIndex: 'id_rank_fk',
      filters: [
        {
          text: 'Superior',
          value: '1',
        },
        {
          text: 'Medio',
          value: '2',
        },
        {
          text: 'Operativo',
          value: '3',
        },
      ],
      onFilter: (value, record) => record.id_rank_fk ===  Number(value),
      render: (idRank) => {
        switch (idRank) {
          case 1:
            return <Label color='purple'>Superior</Label>;
          case 2:
            return <Label color='blue'>Medio</Label>;
          case 3:
            return <Label color='orange'>Operativo</Label>;
          default:
            return <Label color='green'>Medio</Label>;
        }
      }, 
    },
    {
      title: 'Activo',
      dataIndex: 'is_active',
      render: (value) => (value ? <Icon name='checkmark' /> : <Icon name='close' />),
    },
    {
      title: 'Acciones',
      render: (text, record) => (
        <span style={{ textAlign: 'left' }}>
          <Button icon onClick={() => updateUser(record)}> <Icon name='edit' /></Button>
         {/*  <Button icon color="red" onClick={() => console.log(`Eliminar usuario ${record.first_name}`)}> <Icon name='trash' /></Button> */}
        </span>
      ),
    },
  ];

  return (
    <>
      <br />
      <Table 
        dataSource={users}
        columns={columns}
        bordered
        pagination={{ pageSize: 7 }} // Optional pagination
        rowKey="id"
      />
    </>    
  );
};
 



/* import React from 'react';
import MUIDataTable from 'mui-datatables';
import { Button, Icon,Label } from '@mui/material'; // Import for icons and buttons
import './TableUsers.scss';
export const TableUsers = (props) => {
  const { users, updateUser } = props;

  const columns = [
    { label: 'UserName', name: 'username' },
    { label: 'Nombre', name: 'first_name' },
    { label: 'Apellido', name: 'last_name' },
    { label: 'Email', name: 'email' },
    {
      label: 'Activo',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ? (
            <Label color="green">
              <Icon>check</Icon> Activo
            </Label>
          ) : (
            <Label color="red">
              <Icon>close</Icon> Inactivo
            </Label>
          );
        },
      },
    },
    {
      label: 'Staff',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ? (
            <Label color="green">
              <Icon>check</Icon> Activo
            </Label>
          ) : (
            <Label color="red">
              <Icon>close</Icon> Inactivo
            </Label>
          );
        },
      },
    },
    { label: 'Acciones', options: { filter: false, sort: false } }, // Disable filtering and sorting for actions column
  ];

  const options = {
    // Customize options as needed, e.g., for pagination, filtering, sorting
  };

  return (
    <MUIDataTable
      title={"Usuarios"}
      data={users}
      columns={columns}
      options={options}
      renderActions={(rowData) => (
        <ButtonGroup size="small">
          <IconButton onClick={() => updateUser(rowData)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => console.log(`Eliminar usuario ${rowData.first_name}`)}>
            <DeleteIcon />
          </IconButton>
        </ButtonGroup>
      )}
    />
  );
};
 */
 

/* import React from 'react'
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
                <Actions user={user} updateUser={updateUser}/>

              </Table.Row>
            ))
          }
        </Table.Body>
     </Table>
  );
}

function Actions({user, updateUser}){
  return (
    <Table.Cell textAlign='right'>      
      <Button icon onClick={() => updateUser(user)}> <Icon name='edit' /> </Button>
      <Button icon negative onClick={() => console.log(`Eliminar usuario ${user.first_name}`)}> <Icon name='trash' /></Button>
    </Table.Cell>
  )
}   */