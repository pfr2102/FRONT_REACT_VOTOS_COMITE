import React, { useState ,useEffect } from 'react'
import { useVotes } from '../../hooks';
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

    /* useEffect(() => {
        getVotesManual();
    },[refresh]); */


      /* FUNCIONES PARA LA FUNCIONALIDAD DE LAS VENTANAS */
     const openCloseModal = () => { setShowModal((prev) => !prev); }  // modificar el estado de la ventana (cerrado/abierto) 
     const onRefresh = () => { setRefresh((prev) => !prev);} 


     /* SECCION DE FUNCIONALIDAD DEL FORMULARIO */
     const formik = useFormik({
        initialValues:{
            id_etapa_fk: '',
            id_rango_fk: '',
            fecha_voto: '',
        },
        /* esquema de validaciones o restricciones de cada campo */
        validationSchema: Yup.object({
            id_etapa_fk: Yup.number().required('El numero de etapa'), 
            id_rango_fk: Yup.number().required('El numero del rango'), 
            fecha_voto: Yup.number().required('El año de las votaciones o nominaciones'),                
        }),
        /* es la accion a realizar cuando el usuario envia el formulario */
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {//si hay un usuario actualizamos
                await getVotesManual(formValue); //llamamos a la api para crear el usuario con una solicitud post 
            }catch (error) {
                console.error(error);
                toast.error(`Error: ${error}`);
            }
        }
    })


  return (
    <>
        <div className='header-page-admin'>
            <h2>Consultar ranking de votos</h2>

            <div>   
                <Form className='add-edit-user-form' onSubmit={formik.handleSubmit}>
                    <Form.Input name='id_etapa_fk' label='Etapa' placeholder='Etapa' onChange={formik.handleChange} value={formik.values.id_etapa_fk} error={formik.errors.id_etapa_fk} />
                    <Form.Input name='id_rango_fk' label='Rango' placeholder='Rango' onChange={formik.handleChange} value={formik.values.id_rango_fk} error={formik.errors.id_rango_fk} />
                    <Form.Input name='fecha_voto' label='año' placeholder='año' onChange={formik.handleChange} value={formik.values.fecha_voto} error={formik.errors.fecha_voto} />

                    <Button type='submit' primary fluid content ='Buscar'/>
                </Form>

                <Button positive>
                    <Icon name='refresh' />
                </Button>        
            </div>
        </div>

        <br />

        {loading ? (<Loader active inline='centered'> Cargando...</Loader> ) 
        :  
        (
            <TableVotes votes={votes} />        
        )}
    </>
  )
}
