import ReactDOM from 'react-dom';
import React from 'react';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = React.forwardRef(({ title, children, extraClass, handleCleanIngredient }, onCloseRef) => {
  const modalRoot = document.getElementById('modals');

  const modalRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  
  const closeModal = () => {
    modalRef.current.style.opacity = 0;
    setTimeout(() => {
      overlayRef.current.style.opacity = 0;
    }, 300);
    setTimeout(() => {
      handleCleanIngredient(null)
    }, 550);
  };
  
  React.useEffect(() => {
    onCloseRef.current = closeModal;
    overlayRef.current.style.opacity = 1;
    setTimeout(() => {
      modalRef.current.style.opacity = 1;
    }, 200);
  });

  return ReactDOM.createPortal((
    <>
      <ModalOverlay ref={overlayRef} handleClose={closeModal} />
      <div ref={modalRef} aria-modal='true' className={`${styles.modal} ${extraClass}`}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <CloseIcon type='primary' onClick={closeModal}/>
        </header>
        {children}
      </div>
    </>
  ), modalRoot);
});

Modal.defaultProps = {
  title: '',
}

export default Modal;