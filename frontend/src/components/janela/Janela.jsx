import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '5px',
        maxWidth: '700px',
        maxHeight: '600px',
        height: '70%',
        width: '80%'
      }}>
        {children}
        <button onClick={onClose} style={{ marginTop: '10px' }}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default Modal;