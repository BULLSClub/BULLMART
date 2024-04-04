// QRCodeModal.js
import React from 'react';
import Modal from 'react-modal';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';

import QRCode from 'qrcode.react';



const QRCodeModal = ({ isOpen, onRequestClose, qrDataURL, text }) => {
 
  return (
    
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="QR Code Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Generated Code</h2>
        <button className="modal-close" onClick={onRequestClose}>
          &times;
        </button>
      </div>
      <div className="modal-body">
        {qrDataURL && (
          <div className="qr-container">
            <QRCode value={text} renderAs="canvas" id="qr-code-canvas" />
          </div>
        )}
        <div className="overlay-container">
          
        </div>
        <div className="button-group">
          <a href={qrDataURL} download="qrcode.png">
            Download Your QR Code
          </a>
          
        </div>
      </div>
    </Modal>
  );
};

export default QRCodeModal;
