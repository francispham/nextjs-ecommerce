import gql from 'graphql-tag';
import { useState } from "react";
import nProgress from "nprogress";
import styled from "styled-components";

// https://nextjs.org/docs/api-reference/next/router#userouter
import { useRouter } from 'next/router';

// https://stripe.com/docs/stripe-js/react#elements-provider
import { loadStripe } from "@stripe/stripe-js";

// https://stripe.com/docs/stripe-js/react#element-components
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";

import SickButton from "./styles/SickButton";
import { useCart } from '../lib/cartState.js';
import { useMutation } from '@apollo/client';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkoutNow(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

/*
  ? The loadStripe function asynchronously loads the Stripe.js script and initializes a Stripe object. Pass the returned Promise to Elements.
  * Call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` Object on every Render.
*/  
const stripeAPI = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const stripe = useStripe()  //  * Docs: https://stripe.com/docs/stripe-js/react#usestripe-hook
  const elements = useElements(); //  * Docs: https://stripe.com/docs/stripe-js/react#useelements-hook
  const { closeCart } = useCart();
  const router = useRouter();

  const [checkout, { error: graphQLError }] = useMutation(CREATE_ORDER_MUTATION);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    nProgress.start();

    //  ? Create the Payment Method via Stripe -> Get the Stripe Token!:
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error);
      nProgress.done();
      return; // ? Stops the checkout from happening from Server.
    };
    // ? if successful, send The Token received from Stripe to the Keystone Server via a Custom Mutation!
    const order = await checkout({
      variables: { token: paymentMethod.id },
    });
    console.log(`Finished with the ${order?.id}!!!!`);
    
    // ? Change the Page to view the Order
    router.push({ //  * Docs: https://nextjs.org/docs/api-reference/next/router#with-url-object
      pathname: '/order/[pId]',
      query: { pId: order.data.checkoutNow.id },
    });

    closeCart();
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripeAPI}>
      <CheckoutForm />
    </Elements>
  );
}

export { Checkout };