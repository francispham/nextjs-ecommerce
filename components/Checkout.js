import styled from "styled-components";

// https://stripe.com/docs/stripe-js/react#elements-provider
import { loadStripe } from "@stripe/stripe-js";

// https://stripe.com/docs/stripe-js/react#element-components
import { CardElement, Elements } from "@stripe/react-stripe-js";

import SickButton from "./styles/SickButton";

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

/*
  ? The loadStripe function asynchronously loads the Stripe.js script and initializes a Stripe object. Pass the returned Promise to Elements.
  * Call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` Object on every Render.
*/  
const stripeAPI = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function Checkout() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('e:', e);
    /*
      TODO Steps: 
        1. Add a Loading indicator
        2. Start Page Transition
        3. Create the Payment Method via Stripe (Token comes back here if successful)
        4. Handle any Errors from Stripe
        5. Send The Token from Step 3 to the Keystone Server via a Custom Mutation!!!
        6. Change the Page to view the Order
        7. Close the Cart
        8. Turn the Loading Indicator off
    */ 
  }

  return (
    <Elements stripe={stripeAPI}>
      <CheckoutFormStyles
        onSubmit={handleSubmit}
      >
        <CardElement />
        <SickButton>Check Out Now</SickButton>
      </CheckoutFormStyles>
    </Elements>
  );
}

export { Checkout };