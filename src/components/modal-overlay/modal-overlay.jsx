import React from 'react';
import styles from './modal-overlay.module.css';
import { functionPropType } from '../../utils/prop-types'

const ModalOverlay = React.forwardRef(({ handleClose }, overlayRef) => {
  return (
    <div ref={overlayRef} aria-hidden='true' className={styles.overlay} onMouseDown={handleClose}></div>
  )
})

ModalOverlay.propTypes = {
  handleClose: functionPropType.isRequired,
}

export default React.memo(ModalOverlay);