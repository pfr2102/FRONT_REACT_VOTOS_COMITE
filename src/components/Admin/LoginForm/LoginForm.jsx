import React from 'react';
//importaciones para el manejo de estilos 
import {Button, Form} from 'semantic-ui-react';
import "./LoginForm.scss";
//importaciones para el manejo de formularios
import * as yup from 'yup';
import {useFormik} from 'formik';
import {toast} from 'react-toastify';
//importaciones para la comunicacion con el backend
import {loginApi} from '../../../api/user';
/*importaciones para el manejo provider (el contexto de nuestra aplicacion)*/
import {useAuth} from '../../../hooks';

export const LoginForm = () => {
   /* console.log(useAuth()); */
   const {login} = useAuth();

   const formik = useFormik({
      //son todos los valores de nuestro formulario
      initialValues:{
         email:'',
         password:'',         
      },
      //validaciones del formulario
      validationSchema: yup.object({
         //basicamente dices que en este campo tiene que ser de tipo string, un email y que es requerido
         email: yup.string().email(true).required(true),
         password: yup.string().required(true),
      }),
      //es la accion a realizar cuando el usuario envia el formulario
      onSubmit: async (formValue) => {
         try {
            const response = await loginApi(formValue);
            //la api cuando responde nos regresa un token de acceso cuando el login es correcto
            const {access} = response;
            //llamamos al login de nuestro contexto
            login(access);
         } catch (error) {
            console.log(error);
            //para que salga el alerta chiquito animado en caso de error
            toast.error('ERROR EN LA SOLICITUD');
         }
      },
   });



  return (
     <Form className='login-form-admin' onSubmit={formik.handleSubmit}>
        <Form.Input 
         name="email" 
         placeholder='Correo electronico' 
         value={formik.values.email} 
         onChange={formik.handleChange}
         error={formik.errors.email}
        />
        <Form.Input 
         name="password" 
         placeholder='Contraseña' 
         type='password' 
         value={formik.values.password} 
         onChange={formik.handleChange}
         error={formik.errors.password}
        />
        <Button type='submit' content='Iniciar Sesion' primary fluid/>
     </Form>
  );
}
