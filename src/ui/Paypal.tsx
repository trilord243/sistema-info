interface PaypalProps {
  height: number;
  weight: number;
}
export const Paypal: React.FC<PaypalProps> = ({ height, weight }) => {
  return (
    <img
      src="https://firebasestorage.googleapis.com/v0/b/invitacion-27932.appspot.com/o/paypal-svgrepo-com__2_-removebg-preview.png?alt=media&token=93dc204b-1425-4c31-921d-ec48e3616a61"
      alt="asas"
      className={`w-${weight} h-${height} `}
    />
  );
};
