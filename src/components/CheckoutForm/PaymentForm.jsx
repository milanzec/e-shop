import React from 'react'
import {Typography,Button,Divider, Card} from '@material-ui/core'
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'



const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({checkoutToken ,shippingData,onCaptureCheckout,refreshCart, backStep, nextStep}) => {
   const handleSubmit = async (event,elements,stripe)=>{
        event.preventDefault()

        if(!stripe || !elements)  return;

        const cardElement = await elements.getElement(CardElement)

       const { error, paymentMethod } =  stripe.createPaymentMethod({ type: 'card', card: cardElement });
       
       if (error) {
           console.log(error);
       } else {
           const orderData = {
               line_items:checkoutToken.live.line_items,
               customer:{firstname:shippingData.firstName,lastname:shippingData.lastName,email: shippingData.email },
               shipping: {
                    name: 'International',
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry },
               fulfillment: { shipping_method: shippingData.shippingOption },
               payment: {
                   gateway:'stripe',
                   stripe: {
                       payment_method_id: paymentMethod?.id
                   }
               }
           }
           
           refreshCart()
           onCaptureCheckout(checkoutToken.id,orderData)
           nextStep()

       }
   }

    return (
<>
   <Typography variant="h6" gutterBottom style={{padding:'20px 0'}}>Payment Method
   </Typography> 
   <Elements stripe={stripePromise}>
      <ElementsConsumer>
          {({elements,stripe})=>(
              <form onSubmit={(e)=>handleSubmit(e,elements,stripe)}>
                  <CardElement />
                  <br/><br/>
                  <div style={{display:'flex',justifyContent:'space-between'}} >
                      <Button onClick={backStep} variant="outlined">Back</Button>
                      <Button type="submit" variant="contained" color="primary" disabled={!stripe}>Next</Button>
                  </div>
              </form>
          )}
      </ElementsConsumer>
   </Elements>
</>
    )
}

export default PaymentForm
