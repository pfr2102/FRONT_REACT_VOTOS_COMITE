import React, { useState ,useEffect } from 'react'
import { useVotes, useUser } from '../../hooks';
import { HeaderRankin } from '../../components/Admin/HeaderRankin/HeaderRankin';
import { TableVotes, AddEditUserForm } from '../../components/Admin';
import { ModalBasic } from '../../components/common';
import { Loader } from 'semantic-ui-react';

import {Form, Button, Icon, Checkbox} from 'semantic-ui-react';

export const RankingVotes = () => {
    const { votes, loading, getVotesManual, getVotesManualTop } = useVotes();
    const { users, getUser } = useUser();
    
    /* estados para el funcionamiento de la ventna modal */
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    //estado para refrescar la tabla por cada cambio
    const [refresh, setRefresh] = useState(false);

    useEffect( () => {
         getVotesManual();
    },[]); 


      /* FUNCIONES PARA LA FUNCIONALIDAD DE LAS VENTANAS */
     const openCloseModal = () => { setShowModal((prev) => !prev); }  // modificar el estado de la ventana (cerrado/abierto) 
     const onRefresh = () => { setRefresh((prev) => !prev);} 

     const updateUser = (data) => {
      console.log('ventana modal');
      setTitleModal('Editar usuario');
      setContentModal(<AddEditUserForm onCloseModal={openCloseModal} onRefresh={onRefresh} user={data} isBlock={true}/>);
      openCloseModal();
    }

    const findUser = async (userId) => {
      console.log(userId);
      const response = await getUser(userId);
      console.log(response);
      updateUser(response);
    }
    

  return (
    <>
        <HeaderRankin getVotesManual={getVotesManual}/>

        {loading ? (<Loader active inline='centered'> Esperando Datos...</Loader> ) 
        :  
        (
            <TableVotes votes={votes} findUser={findUser} />        
        )}

        <ModalBasic show={showModal} title={titleModal} onClose={openCloseModal} children={contentModal} size={'md'}/>
    </>
  )
}
