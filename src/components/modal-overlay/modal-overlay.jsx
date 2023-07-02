import React from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay = React.forwardRef(({ handleClose }, overlayRef) => {
  return (
    <div ref={overlayRef} aria-hidden='true' className={styles.overlay} onMouseDown={handleClose}></div>
  )
})

export default ModalOverlay;