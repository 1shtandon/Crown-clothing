import { useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";

import { BUTTON_CLASSES } from "../Button/button.component";

import { selectCurrentUser } from "../../store/user/user.selector"
import { selectCartTotal } from "../../store/cart/cart.selector"

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!stripe || !elements) return;
        
        setIsProcessing(true);

        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount })
        }).then(res => res.json())

        const clientSecret = response.paymentIntent.client_secret
        const cardDetails = elements.getElement(CardElement)
        if (!ifValidCardElement(cardDetails)) return;
        
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardDetails,
            billing_details: {
              name: currentUser ? currentUser.displayName : 'Guest',
            },
          }
        })

        setIsProcessing(false);

        if (paymentResult.error) console.log(paymentResult.error)
        else if (paymentResult.paymentIntent.status === 'succeeded') alert('Payment Successful')
    }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton isLoading={isProcessing} buttonType={BUTTON_CLASSES.inverted}> Pay Now </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
