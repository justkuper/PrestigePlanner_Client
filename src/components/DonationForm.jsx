import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import ReCAPTCHA from "react-google-recaptcha";

const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [captcha, setCaptcha] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captcha) {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
       
        return;
      }

      const cardElement = elements.getElement(CardElement);

      const { error, token } = await stripe.createToken(cardElement);
      if (error) {
        console.error(error);
      } else {
        console.log("Received Stripe token:", token);
        // Use the token to create a charge on your server
      }
    } else {
      alert('Please complete the CAPTCHA');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <CardElement />
      <ReCAPTCHA
        sitekey="your-recaptcha-site-key"
        onChange={() => setCaptcha(true)}
      />
      <button type="submit" disabled={!stripe || !elements}>
        Donate
      </button>
    </form>
  );
};

export default DonationForm;
