import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm'; // Componente donde se encuentra el formulario de pago

const stripePromise = loadStripe('TU_CLAVE_PUBLICA_DE_STRIPE');

function PagoTarjeta() {
  return (
    <Elements stripe={stripePromise}>
      {/* Renderiza el formulario de pago dentro del contenedor Elements */}
      <CheckoutForm />
    </Elements>
  );
}

export default PagoTarjeta;





