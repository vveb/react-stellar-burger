import ReactDOM from 'react-dom';
import React, { ReactNode } from 'react';
import { useRef, useCallback, useEffect } from 'react';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type ModalProps = {
  title?: string;
  children: ReactNode;
  extraClass?: string;
  handleCleanModalData: ((value: string | null) => never) | (() => void);
  closeRequest?: boolean;
  titleClass?: string;
}

const Modal = ({
    title='',
    children,
    extraClass='',
    handleCleanModalData,
    closeRequest=false,
    titleClass='text text_type_main-large'
  }: ModalProps) => {

  const modalRoot = document.getElementById('modals');

  if (!modalRoot) {
    return null;
  }

  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const closeModal = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.style.opacity = '0';
    }
    setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.style.opacity = '0';
      }
    }, 300);
    setTimeout(() => {
      handleCleanModalData(null)
    }, 550);
  }, [handleCleanModalData]);
  
  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.style.cursor = 'pointer';
      overlayRef.current.style.opacity = '1';
    }
    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.style.opacity = '1';
      }
    }, 200);
  }, []);

  useEffect(() => {
    if (closeRequest) {
      closeModal();
    }
  }, [closeRequest, closeModal]);

  useEffect(() => {
    const handleEscClose = (evt: KeyboardEvent) => {
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
          <h2 className={titleClass}>{title}</h2>
          <div className={styles.closeIconContainer}><CloseIcon type='primary' onClick={closeModal}/></div>
        </header>
        {children}
      </div>
    </>
  ), modalRoot);
};

export default React.memo(Modal);