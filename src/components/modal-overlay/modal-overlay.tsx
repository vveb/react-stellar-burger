import React, { ForwardedRef } from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay = React.forwardRef(({ handleClose }: {handleClose: () => void}, overlayRef: ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={overlayRef} aria-hidden='true' className={styles.overlay} onMouseDown={handleClose}></div>
  );
});

export default React.memo(ModalOverlay);