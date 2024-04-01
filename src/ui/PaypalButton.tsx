import { PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalButton {
  totalValue: string;
  invoice: string;
}

export const PaypalButton: React.FC<PaypalButton> = (props) => {
  return (
    <PayPalButtons
      createOrder={(_data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: props.invoice,
              amount: {
                currency_code: "USD",
                value: props.totalValue,
              },
              payee: {
                email_address: "escalonaf12@gmail.com",
              },
            },
          ],
        });
      }}
      onApprove={async (_data, actions) => {
        const order = await actions.order?.capture();
        console.log("Order", order);
      }}
    />
  );
};
