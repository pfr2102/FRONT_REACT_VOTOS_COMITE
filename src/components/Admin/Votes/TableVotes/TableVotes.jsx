import React from 'react';
import { Table } from 'antd';
import './TableVotes.scss';
import { Icon, Button, Label } from 'semantic-ui-react';

export const TableVotes = (props) => {
  const { votes , findUser} = props;
 

  const columns = [
    {
      title: 'Num_etapa',
      dataIndex: 'id_etapa_fk',
      render: (idEtapa) => {
        switch (idEtapa) {
          case 1:
            return <Label color='grey'>Nominaciones</Label>;
          case 2:
            return <Label color='grey'>Elecciones</Label>;
          default:
            return <Label color='red'>Desconocida</Label>;
        }
      },
    },
    {
      title: 'Rango',
      dataIndex: 'id_rango_fk',
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
      onFilter: (value, record) => record.id_rango_fk ===  Number(value),
      render: (idRank) => {
        switch (idRank) {
          case 1:
            return <Label color='purple'>Superior</Label>;
          case 2:
            return <Label color='blue'>Medio</Label>;
          case 3:
            return <Label color='orange'>Operatico</Label>;
          default:
            return <Label color='red'>Desconocido</Label>;
        }
      }, 
    },
    {
      title: 'Nombre',
      dataIndex: 'full_name',
      sorter: true,
      render: (full_name) => `${full_name}`,
    },
    {
      title: 'Año',
      dataIndex: 'year',
      render: (dateString) => dateString.substring(0, 4),//para que se vea solo el año
    },
    {
      title: 'Total votos',
      dataIndex: 'total',
      render: (total) => <Label color='green'>{total} votos</Label>,
    },
    {
      title: 'Imagen',
      render: (text, record) => (
        <span style={{ textAlign: 'left' }}>
          <Button icon color="red" onClick={() => findUser(record.id_emp_candidato_fk)}> <Icon name='upload' /></Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <br />
      <Table 
        dataSource={votes}
        columns={columns}
        bordered
        pagination={{ pageSize: 7 }} // Optional pagination
        rowKey="id_emp_candidato_fk"
      />
    </>    
  );
};
 