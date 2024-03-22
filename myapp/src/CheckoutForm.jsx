import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';







const CheckoutForm = ()=>{




const [message, setmessage] = useState("")

    const stripe = useStripe();
    const elements = useElements();
  
    const [clientSecret, setClientSecret] = useState('');
    const [paymentError, setPaymentError] = useState(null);
    const [Amount, setamount] = useState(0);
  
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post('http://localhost:4000/create-payment-intent', {
            amount: Amount, // Amount in cents
          
     
            currency: 'usd',
          product: 'T-shirt',
          description: 'A beautiful t-shirt',
         
        });
        setClientSecret(response.data.clientSecret);
        console.log(response)
        alert("intent created successfully")
      } catch (error) {
        console.error('Error creating Payment Intent:', error);
        setPaymentError('Failed to create Payment Intent');
      }
    };
  
    const confirmPayment = async () => {
      if (!stripe || !elements) return;
  
      try {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
                email: "Amitshar82@gmail.com",
                name: 'John Doe', // Name of the cardholder
                address: {
                  line1: '123 Main St',
                  city: 'Anytown',
                  postal_code: '12345',
                  country: 'US',
                },
              
              },
          },
        });
  
        if (result.error) {
          console.error('Error confirming payment:', result.error);
          setPaymentError(result.error.message);
        } else {
          console.log('Payment confirmed:', result.paymentIntent);
          setmessage("you payment successfull");
let data = result.paymentIntent;
          let res = await axios.post("http://localhost:4000/payment", { amount:data.amount, currency:data.currency,  description:data.description , status:data.status })

          // Handle successful payment
        }
      } catch (error) {
        console.error('Error confirming payment:', error);
        setPaymentError('Failed to confirm payment');
      }
    };


    const handleI = (e)=>{
setamount(e.target.value);

    }







    return <>
        {!message ? <div>
          <input type="number" placeholder='enter the amount' onChange={handleI} style={{padding:"1rem, 4rem"}} />
      <button onClick={createPaymentIntent}>Create Payment Intent</button>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
      <button onClick={confirmPayment}>Confirm Payment</button>
      {paymentError && <div>Error: {paymentError}</div>}
    </div> : <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}><h1>{message}</h1>
    <h2>thanksyou for bieng here</h2></div> }
    </>
}

export default CheckoutForm;