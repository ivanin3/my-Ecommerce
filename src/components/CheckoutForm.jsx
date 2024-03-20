import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

 function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe no se ha cargado aún
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      // Hubo un error al crear el método de pago
      setError(error.message);
    } else {
      // Enviar el ID del método de pago a tu servidor para procesar el pago
      console.log('Payment Method ID:', paymentMethod.id);
      // Aquí puedes enviar el ID del método de pago a tu servidor para procesar el pago
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
      {error && <div>{error}</div>}
    </form>
  );
}

export default CheckoutForm;
