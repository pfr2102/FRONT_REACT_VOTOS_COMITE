
import "./AddStageForm.scss";

export const AddVoteForm = () => {

 /* SECCION DE FUNCIONALIDAD DEL FORMULARIO */
 const formik = useFormik({
  initialValues:{
      id_etapa_fk: '',
      id_rango_fk: '',
      fecha_voto: '',
  },
  /* esquema de validaciones o restricciones de cada campo */
  validationSchema: Yup.object({
      id_etapa_fk: Yup.number().required(true), 
      id_rango_fk: Yup.number().required(true), 
      fecha_voto: Yup.number().required(true),                
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
    
    </>
  );
};
