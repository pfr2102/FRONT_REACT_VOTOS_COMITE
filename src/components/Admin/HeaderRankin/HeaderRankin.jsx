import React, { useState ,useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Form, Button, Icon, Dropdown } from 'semantic-ui-react';
import {useVotes} from '../../../hooks';
import './HeaderRankin.scss';

export const HeaderRankin = ({getVotesManual}) => {

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
        <div className='header-page-admin-rankin'>
            <h2>Consultar ranking de votos</h2>             
        </div>
    
        <div className='add-edit-user-form-rankin'>   
            <Form className='add-edit-user-form-rankin' onSubmit={formik.handleSubmit}>
                {/* Dropdown de Etapas */}
                <Form.Field>
                    <label>Etapa</label>
                    <Dropdown
                    selection
                    name='id_etapa_fk'
                    placeholder='Selecciona una etapa'
                    options={[
                        { key: '1', value: '1', text: 'Nominaciones' },
                        { key: '2', value: '2', text: 'Selecciones' },
                    ]}
                    onChange={(e, { value }) => formik.setFieldValue('id_etapa_fk', value)}
                    value={formik.values.id_etapa_fk || null}
                    />
                </Form.Field>
                {/* Dropdown de Rangos */}
                <Form.Field>
                    <label>Rango</label>
                    <Dropdown
                    selection
                    name='id_rango_fk'
                    placeholder='Selecciona un rango'
                    options={[
                        { key: '1', value: '1', text: 'Superior' },
                        { key: '2', value: '2', text: 'Medio' },
                        { key: '3', value: '3', text: 'Operativo' },
                    ]}
                    onChange={(e, { value }) => formik.setFieldValue('id_rango_fk', value)}
                    value={formik.values.id_rango_fk || null}
                    />
                </Form.Field>

                <Form.Input name='fecha_voto' label='Año' placeholder='Año' onChange={formik.handleChange} value={formik.values.fecha_voto} error={formik.errors.fecha_voto} />

                <Button type='submit' primary fluid >Buscar<Icon name='search'style={{marginLeft:'5px'}}/></Button>
            </Form>

            <Button positive>
            <Icon name='refresh' />
            </Button>
        </div>
        <br />
    </>
  )
}
