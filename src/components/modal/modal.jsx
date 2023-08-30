import ReactDOM from 'react-dom';
import React from 'react';
import { useRef, useCallback, useEffect } from 'react';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { stringPropType, reactElementPropType, functionPropType, booleanPropType } from '../../utils/prop-types';

const Modal = ({ title, children, extraClass, handleCleanModalData, closeRequest }) => {
  const modalRoot = document.getElementById('modals');

  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  
  const closeModal = useCallback(() => {
    modalRef.current.style.opacity = 0;
    setTimeout(() => {
      overlayRef.current.style.opacity = 0;
    }, 300);
    setTimeout(() => {
      // handleCleanModalData(null)
      handleCleanModalData()
    }, 550);
  }, [handleCleanModalData]);
  
  useEffect(() => {
    overlayRef.current.style.cursor = 'pointer';
    overlayRef.current.style.opacity = 1;
    setTimeout(() => {
      modalRef.current.style.opacity = 1;
    }, 200);
  }, []);

  useEffect(() => {
    if (closeRequest) {
      closeModal();
    }
  }, [closeRequest, closeModal]);

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        closeModal();
      };
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [closeModal]);

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
};

Modal.defaultProps = {
  title: '',
  closeRequest: false,
  extraClass: '',
};

Modal.propTypes = {
  title: stringPropType,
  children: reactElementPropType.isRequired,
  extraClass: stringPropType,
  handleCleanModalData: functionPropType.isRequired,
  closeRequest: booleanPropType,
};

export default React.memo(Modal);