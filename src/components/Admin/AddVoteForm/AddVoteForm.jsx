import React from "react";
import { Table, Button } from "antd";
import { useAuth, useVotes } from "../../../hooks";
import "./AddVoteForm.scss";

export const AddVoteForm = ({ users, onDelete, stage, onClose }) => {
  const { auth } = useAuth();
  const { addVote } = useVotes();
  const handleVote = () => {
    const votes = users.map((user) => ({
      id_emp_votante_fk: auth.me.id,
      id_emp_candidato_fk: user.id,
      /* id_rango_fk: auth.me.id_rank_fk, */
      id_rango_fk: 1,
      id_etapa_fk: stage.id,
      fecha_voto: new Date(),
      estatus_revocacion: "false",
    }));
    console.log(votes);
    addVote(votes)
      .then(() => {
        console.log("Votos agregados correctamente");
        onClose();
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
      render: (text, record) => `${record.first_name} ${record.last_name}`,
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
        <Button type="primary" onClick={() => handleDelete(record.id)}>
          Eliminar voto
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
          rowKey="id"
        />
      </div>
      <div className="voteButton">
        <Button type="primary" onClick={handleVote}>
          Votar
        </Button>
      </div>
    </>
  );
};
