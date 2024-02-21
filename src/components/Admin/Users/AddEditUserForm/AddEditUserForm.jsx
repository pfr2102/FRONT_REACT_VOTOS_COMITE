import React ,{ useState } from 'react';
import {Form, Button, Checkbox} from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useUser} from '../../../../hooks';
import './AddEditUserForm.scss';    
import { toast } from 'react-toastify';

export const AddEditUserForm = ({onCloseModal, onRefresh, user}) => {
    const { addUser } = useUser();

    const formik = useFormik({
        initialValues:{
            username:user?.username || '',
            first_name:user?.first_name || '',
            last_name: user?.last_name || '',
            email: user?.email || '',
            password: '',
            is_staff:user?.is_staff ? true : false,
            is_active:user?.is_active ? true : false 
        },
        /* esquema de validaciones o restricciones de cada campo */
        validationSchema: Yup.object({
            username: Yup.string().required('El nombre de usuario es obligatorio'), 
            first_name: Yup.string().required('El nombre es obligatorio'),
            last_name: Yup.string().required('El apellido es obligatorio'),
            email: Yup.string().required('El email es obligatorio'),
            password: (user?.password) ? Yup.string() : Yup.string().required('La contraseña es obligatoria'),//si se envio el user significa que se va a actualizar asi que la contraseña ya es opcional
            is_staff: Yup.boolean().required('El rol es obligatorio'),
            is_active: Yup.boolean().required('El estado es obligatorio')   
        }),
        /* es la accion a realizar cuando el usuario envia el formulario */
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                /* console.log(formValue); */
                let action;
                if(user) {  console.log('Actualizar usuario'); action='Actualizado';  } //si hay un usuario actualizamos
                else {  await addUser(formValue);  action='Creado';} //llamamos a la api para crear el usuario con una solicitud post  
                onRefresh();//si no hay errores refrescamos la tabla
                onCloseModal(); //cerramos la ventana modal             
                toast.success(`Usuario ${action} exitosamente`); //mostramos una notificacion
            }catch (error) {
                console.error(error);
                toast.error(`Error: ${error}`);
            }
        }
    })



  return (
    <Form className='add-edit-user-form' onSubmit={formik.handleSubmit}>
        <Form.Input name='username' label='Username' placeholder='Username' onChange={formik.handleChange} value={formik.values.username} error={formik.errors.username} />
        <Form.Input name='first_name' label='First Name' placeholder='First Name' onChange={formik.handleChange} value={formik.values.first_name} error={formik.errors.first_name} />
        <Form.Input name='last_name' label='Last Name' placeholder='Last Name' onChange={formik.handleChange} value={formik.values.last_name} error={formik.errors.last_name} />
        <Form.Input name='email' label='Email' placeholder='Email' onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} />
        <Form.Input name='password' type='password' label='Password' placeholder='Password' onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} />

        <div className='add-edit-user-form__active'>
            <Checkbox toggle checked={formik.values.is_active} onChange={(_, data) => formik.setFieldValue('is_active', data.checked)} /> Usuario Activo
        </div>

        <br />

        <div className='add-edit-user-form__staff'>
            <Checkbox toggle checked={formik.values.is_staff} onChange={(_, data) => formik.setFieldValue('is_staff', data.checked)} /> Usuario Administrador
        </div>

        <br/>

        <Button type='submit' primary fluid content ={user? 'Actualizar' : 'Guardar'}/>
    </Form>
  )
}
