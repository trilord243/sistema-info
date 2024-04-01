import { PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalButtonProps {
  totalValue: string;
  invoice: string;
  email: string;
}

export const PaypalButton: React.FC<PaypalButtonProps> = ({
  totalValue,
  invoice,
  email,
}) => {
  return (
    <PayPalButtons
      style={{
        layout: "horizontal",
        color: "blue" as const,
        shape: "rect",
        label: "paypal",
        height: 30,
      }}
      createOrder={(_data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: totalValue,
              },
              payee: {
                email_address: email,
              },
              description: invoice,
            },
          ],
        });
      }}
      onApprove={(_data, actions) => {
        if (!actions.order) {
          throw new Error("Order actions not available");
        }

        return actions.order.capture().then((details) => {
          if (
            !details.payer ||
            !details.payer.name ||
            !details.payer.name.given_name
          ) {
            alert("No payer details available");
            return;
          }
          alert("Donación completada por " + details.payer.name.given_name);
        });
      }}
      onError={(err) => {
        console.error(err);
        alert("El pago no se pudo procesar. Inténtalo de nuevo.");
      }}
    />
  );
};
