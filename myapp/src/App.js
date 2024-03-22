import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51I7H7GC7Q0v6DfFzugTUthUI8uaQTLwwoH83sjTW7dwGoUNMpcNN2nnoC9eqlv2sKJO1sOdCViSujPUNA9zVU9Ot00366kW4xF');

function App() {
  return (
    <div>
      <h1>Stripe Payment</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
