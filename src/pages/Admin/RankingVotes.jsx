import React, { useState ,useEffect } from 'react'
import { useVotes } from '../../hooks';
import { HeaderRankin } from '../../components/Admin/HeaderRankin/HeaderRankin';
import { Header, TableVotes, AddEditUserForm } from '../../components/Admin';
import { ModalBasic } from '../../components/common';
import { Loader } from 'semantic-ui-react';
import { add } from 'lodash';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Form, Button, Icon, Checkbox} from 'semantic-ui-react';

export const RankingVotes = () => {
    const { votes, loading, getVotesManual } = useVotes();
    
    /* estados para el funcionamiento de la ventna modal */
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    //estado para refrescar la tabla por cada cambio
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getVotesManual();
    },[]); 


      /* FUNCIONES PARA LA FUNCIONALIDAD DE LAS VENTANAS */
     const openCloseModal = () => { setShowModal((prev) => !prev); }  // modificar el estado de la ventana (cerrado/abierto) 
     const onRefresh = () => { setRefresh((prev) => !prev);} 
    

  return (
    <>
        <HeaderRankin getVotesManual={getVotesManual}/>

        {loading ? (<Loader active inline='centered'> Esperando Datos...</Loader> ) 
        :  
        (
            <TableVotes votes={votes} />        
        )}
    </>
  )
}
