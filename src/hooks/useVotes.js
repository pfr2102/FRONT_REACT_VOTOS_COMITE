import { useState } from "react";
import { getCountVotes, getCountVotesTop, getCheckVotes, addVotesApi } from "../api/votes";
import { useAuth } from "./useAuth";

export function useVotes() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(null);

  const getVotesManual = async (data) => {
    try {
      setLoading(true);
      const response = await getCountVotes(
        data.id_etapa_fk,
        data.id_rango_fk,
        data.fecha_voto,
        auth.token
      );
      setLoading(false);

      console.log(response);
      setVotes(response);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getVotesUser = async (id_etapa) => {
    try {
      setLoading(true);
      const response = await getCountVotes(
        id_etapa,
        auth.me.id_rank_fk,
        anio_voto, // Aquí necesitas definir 'anio_voto'
        auth.token
      );
      setLoading(false);

      setVotes(response);
      console.log(votes);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getVotesManualTop = async (id_etapa, fecha_voto, tope) => {
    try {
      setLoading(true);
      const response = await getCountVotesTop(
        id_etapa,
        auth.me.id_rank_fk,
        fecha_voto,
        tope,
        auth.token
      );
      setLoading(false);

      setVotes(response);
      console.log(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const userVoted = async (id_etapa, anio_voto) => {
    try {
      setLoading(true);
      const response = await getCheckVotes(
        auth.me.id,
        id_etapa,
        anio_voto,
        auth.token
      );
      setLoading(false);
      return response; // Devuelve directamente la respuesta
    } catch (error) {
      setLoading(false);
      setError(error);
      return false; // En caso de error, devuelve false
    }
  };
  const addVote = async (data) => {
    try {
      setLoading(true);
      await addVotesApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    votes,
    getVotesUser,
    getVotesManual,
    getVotesManualTop,
    userVoted,
    addVote
  };
}
