// components/PaymentSuccess.jsx
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axios.js';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      console.log(sessionId);
      
      if (!sessionId) {
        toast.error('Missing payment session ID');
        setTimeout(() => navigate('/'), 300);
        navigate('/');
        return;
      }

      try {
        // Verify payment with your backend
        console.log("before akjnan")
        const { data } = await axiosInstance.post('/api/user/payment-success', {
          session_id: sessionId
        });
        console.log("Data ------> ",data)
        if (data.message === "Payment successful") {
            console.log("Payment Successful")
          toast.success('Payment completed successfully!');
          // Clear cart and pending order
          localStorage.removeItem('pendingOrder');
          setTimeout(() => navigate('/'), 300);
        } else {
          toast.error('Payment verification failed');
          setTimeout(() => navigate('/'), 300);
        }
      } catch (error) {
        toast.error('Could not verify payment');
        console.error('Verification error:', error);
        setTimeout(() => navigate('/'), 300);
      } finally {
        toast.success("Payment Successful")
        setTimeout(() => navigate('/'), 300);
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Verifying your payment...</h2>
        <p>Please wait while we confirm your transaction</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;