// components/PaymentCanceled.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PaymentCanceled = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.warning('Payment was canceled');
    navigate('/');
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Payment Canceled</h2>
        <p>You can try again from your cart</p>
      </div>
    </div>
  );
};

export default PaymentCanceled;