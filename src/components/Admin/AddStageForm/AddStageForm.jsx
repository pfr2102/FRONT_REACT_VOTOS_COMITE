import "./AddStageForm.scss";
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useStage } from '../../../hooks';


export const AddStageForm = ({ stage, onCloseModal}) => {
  const { updateStage } = useStage();

  const formik = useFormik({
    initialValues: {
      fecha_inicio: '',
      fecha_fin: '',
    },
    validationSchema: Yup.object({
      fecha_inicio: Yup.date().required('Este campo es obligatorio'),
      fecha_fin: Yup.date().required('Este campo es obligatorio'),
    }),
    onSubmit: async (formValues) => {
      try {
        // Formatea las fechas antes de enviarlas
        console.log(formValues.fecha_inicio);
        console.log(formValues.fecha_fin);
        console.log(stage);
        await updateStage(stage, formValues);
        // Tu lógica para manejar el envío del formulario con las fechas formateadas
        onCloseModal();
        toast.success(`fechas de la etapa ${stage} actualizadas exitosamente`);
      } catch (error) {
        console.error(error);
        toast.error(`Error: ${error}`);
        // Manejar errores o mostrar mensajes de error
      }
    },
  });

  return (
    <>
      <Form className='add-edit-stage-form-rankin' onSubmit={formik.handleSubmit}>
        <Form.Input
          type="date"
          label="Fecha de Inicio"
          name="fecha_inicio"
          onChange={formik.handleChange}
          value={formik.values.fecha_inicio}
        />
        {formik.errors.fecha_inicio && formik.touched.fecha_inicio && (
          <div className="error">{formik.errors.fecha_inicio}</div>
        )}

        <Form.Input
          type="date"
          label="Fecha de Fin"
          name="fecha_fin"
          onChange={formik.handleChange}
          value={formik.values.fecha_fin}
        />
        {formik.errors.fecha_fin && formik.touched.fecha_fin && (
          <div className="error">{formik.errors.fecha_fin}</div>
        )}

        <Button type='submit' primary fluid className="custom-button">
          Actualizar Fechas <Icon name='calendar' style={{ marginLeft: '5px'  }} />
        </Button>
      </Form>
      <br />
    </>
  );
};