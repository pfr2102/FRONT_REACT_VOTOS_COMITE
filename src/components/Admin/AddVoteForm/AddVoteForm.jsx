import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useAuth, useVotes } from "../../../hooks";
import {toast} from 'react-toastify';
import { Icon, Button } from 'semantic-ui-react';
import "./AddVoteForm.scss";

export const AddVoteForm = ({ users, onDelete, stage, onClose }) => {
  const { auth } = useAuth();
  const { addVote } = useVotes();

  const handleVote = () => {
    const votes = users.map((user) => ({
      id_emp_votante_fk: auth.me.id,
      id_emp_candidato_fk: stage === 1 ? user.id : user.id_emp_candidato_fk,
      id_rango_fk: auth.me.id_rank_fk,
      id_etapa_fk: stage,
      fecha_voto: new Date(),
      estatus_revocacion: false,
    }));

    console.log(votes);

    addVote(votes)
      .then(() => {
        toast.success('VOTOS REGISTRADOS EXITOSAMENTE');
        onClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (userId) => {
    onDelete(userId);
  };

  // Definir las columnas para la tabla
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        stage === 1
          ? `${record.first_name} ${record.last_name}`
          : `${record.full_name}`,
    },
    {
      title: "Dependencia",
      dataIndex: "dependency",
      key: "dependency",
    },
    {
      title: "Puesto de Trabajo",
      dataIndex: "workstation",
      key: "workstation",
    },
    {
      title: "Acción",
      key: "action",
      render: (text, record) => (
        <Button icon color="red" 
        onClick={() => stage === 1 ? handleDelete(record.id) : handleDelete(record.id_emp_candidato_fk)}>  <Icon name='trash' />
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="tabContentContainer">
        <Table
          dataSource={users}
          columns={columns}
          pagination={false}
          rowKey={(record) => stage === 2 ? record.id_emp_candidato_fk : record.id}
        />
      </div>
      <div className="buttonContainer">
        <Button className="voteButton" icon onClick={handleVote}> <Icon name='edit' />
          Votar
        </Button>
      </div>
    </>
  );
};
