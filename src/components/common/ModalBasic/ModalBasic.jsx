import React from 'react';
import { Modal } from 'semantic-ui-react';
import './ModalBasic.scss';
export const ModalBasic = ({show, size, title, children, onClose}) => {
  return (
    <Modal className='modal-basic' open={show} onClose={onClose} size={ size }>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  )
}

/* es para poner valores predefinidos en los props del componente por si viene vacios */
ModalBasic.defaultProps = {
  size: 'small',
  show: false,
  title: 'Modal',
}
