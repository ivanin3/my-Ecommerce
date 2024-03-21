import React, { useContext, useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { MarketContext } from '../context/MarketProvider';
import { useNavigate } from 'react-router-dom';
import { guardarTransaccionEnFirebase } from '../config/firebase'; // Importa la función para guardar transacciones en Firebase
import { AuthContext } from '../context/AuthProvider'; // Importa el contexto de autenticación de Firebase

export function PagoTarjeta() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { shoppingCart, setShoppingCart } = useContext(MarketContext);
  const { currentUser } = useContext(AuthContext); // Obtiene el usuario autenticado
  const [compraExitosa, setCompraExitosa] = useState(false); // Estado para controlar el mensaje de compra exitosa

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Crea la transacción con Stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: event.target.name.value
      }
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);

      guardarTransaccionEnFirebase({
        usuario: currentUser.uid, 
        productos: shoppingCart,
        total: calcularTotalCompra(),
        metodoPago: 'tarjeta',
      });

      setShoppingCart([]);

      setCompraExitosa(true);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const handleVolver = () => {
    navigate("/resumen-compra");
  };

  const calcularTotalCompra = () => {
    return shoppingCart.reduce((total, item) => total + item.precio, 0).toFixed(2);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f7f7f7',
    }}>
      <h2 style={{ marginBottom: '30px', color: '#333' }}>Pago con Tarjeta</h2>
      <div style={{ width: '500px', padding: '30px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        {/* Elemento de número de tarjeta */}
        <label style={{ marginBottom: '10px', fontSize: '16px', color: '#333', display: 'block' }}>Número de Tarjeta</label>
        <CardNumberElement style={{ base: { fontSize: '16px', '::placeholder': { color: '#aab7c4' }, border: '1px solid #ccc', borderRadius: '5px', padding: '10px', width: '100%' } }} />
        {/* Elemento de fecha de caducidad */}
        <label style={{ marginBottom: '10px', fontSize: '16px', color: '#333', marginTop: '20px', display: 'block' }}>Fecha de Caducidad</label>
        <CardExpiryElement style={{ base: { fontSize: '16px', '::placeholder': { color: '#aab7c4' }, border: '1px solid #ccc', borderRadius: '5px', padding: '10px', width: '100%' } }} />
        {/* Elemento de CVC */}
        <label style={{ marginBottom: '10px', fontSize: '16px', color: '#333', marginTop: '20px', display: 'block' }}>CVC</label>
        <CardCvcElement style={{ base: { fontSize: '16px', '::placeholder': { color: '#aab7c4' }, border: '1px solid #ccc', borderRadius: '5px', padding: '10px', width: '100%' } }} />
        <button type="submit" onClick={handleSubmit} disabled={!stripe} style={{ padding: '15px 30px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', outline: 'none', marginTop: '20px', width: '100%', textAlign: 'center' }}>
          Pagar {calcularTotalCompra()} €
        </button>
        <button onClick={handleVolver} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', outline: 'none' }}>
          Volver al Resumen de Compra
        </button>
      </div>
      {compraExitosa && (
        <div style={{ marginTop: '20px', fontSize: '18px', color: 'green' }}>
          ¡Compra realizada con éxito!
        </div>
      )}
    </div>
  );
}



















