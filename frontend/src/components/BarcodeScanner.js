import React, { useState } from 'react';
import BarcodeScanner from 'react-qr-barcode-scanner';

const Scanner = ({ onScan }) => {
  const [data, setData] = useState('Not Found');

  return (
    <div>
      <BarcodeScanner
        width={300}
        height={300}
        onUpdate={(err, result) => {
          if (result) {
            setData(result.text);
            onScan(result.text);
          } else {
            setData('Not Found');
          }
        }}
      />
      <p>{data}</p>
    </div>
  );
};

export default Scanner;
