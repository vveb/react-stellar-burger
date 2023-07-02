import ReactDOM from 'react-dom';
import React from 'react';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = React.forwardRef(({ title, children, extraClass, handleCleanIngredient }, onCloseRef) => {
  const modalRoot = document.getElementById('modals');

  const modalRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  
  const closeModal = React.useCallback(() => {
    modalRef.current.style.opacity = 0;
    setTimeout(() => {
      overlayRef.current.style.opacity = 0;
    }, 300);
    setTimeout(() => {
      handleCleanIngredient(null)
    }, 550);
  }, []);
  
  React.useEffect(() => {
    onCloseRef.current = closeModal; //Это нужно, чтобы прокинуть функцию закрытия до кнопки сабмита в OrderDetails
    overlayRef.current.style.cursor = 'pointer';
    overlayRef.current.style.opacity = 1;
    setTimeout(() => {
      modalRef.current.style.opacity = 1;
    }, 200);
  });

  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [])

  return ReactDOM.createPortal((
    <>
      <ModalOverlay ref={overlayRef} handleClose={closeModal} />
      <div ref={modalRef} aria-modal='true' className={`${styles.modal} ${extraClass}`}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.closeIconContainer}><CloseIcon type='primary' onClick={closeModal}/></div>
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