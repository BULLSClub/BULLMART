import React, { useState, useEffect } from 'react';
import QRCodeModal from './QRCodeModal';

const QRCodeDisplay = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [qrDataURL, setQRDataURL] = useState(null);
  const [inputURL, setInputURL] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
    generateQRCode(inputURL);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (modalIsOpen) {
      generateQRCode(inputURL);
    }
  }, [modalIsOpen, inputURL]);

  const generateQRCode = (url) => {
    // Generate QR code based on the URL
    const qrCodeDataURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}`;
    setQRDataURL(qrCodeDataURL);
  };

  const handleURLChange = (event) => {
    setInputURL(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Enter URL"
        value={inputURL}
        onChange={handleURLChange}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '300px',
        }}
      />
      <button
        onClick={openModal}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginLeft: '10px',
        }}
      >
        Generate QR Code
      </button>

      <QRCodeModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        qrDataURL={qrDataURL}
        text={inputURL}
      />
    </div>
  );
};

export default QRCodeDisplay;
