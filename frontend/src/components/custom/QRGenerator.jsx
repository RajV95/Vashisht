import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";

const QRGenerator = ({ orderId }) => {
  const qrRef = useRef(null);

  useEffect(() => {
    if (qrRef.current) {
      QRCode.toCanvas(
        qrRef.current,
        `${orderId}`, // Unique payload
        { width: 100, margin: 1 },
        (error) => {
          if (error) console.error("QR generation error:", error);
        }
      );
    }
  }, [orderId]);

  return (
    <div className="p-2 bg-white rounded border border-gray-200">
      <canvas ref={qrRef} />
      <p className="text-xs text-center mt-1 text-gray-500">Scan at mess</p>
    </div>
  );
};

export default QRGenerator;