import React from 'react';

const Blob = ({ text }) => {
  const blobStyle = {
    backgroundColor: '#6f8ab7',
    color: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div style={blobStyle}>
      {text}
    </div>
  );
};

export default Blob;
