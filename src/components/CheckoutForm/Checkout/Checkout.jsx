import React, { useState,useEffect } from 'react'
import {Paper, Stepper, Step, StepLabel, CircularProgress, Typography ,Divider, Button,CssBaseline} from '@material-ui/core'
import {Link} from 'react-router-dom' 

import { commerce } from '../../../lib/commerce'
import useStyles from './styles'
import PaymentForm from '../PaymentForm'
import AddressForm from '../AddressForm'
import Review from '../Review'
import { FiberPin } from '@material-ui/icons'



const steps = ['Shipping address','Review your order','Payment details',];






const Checkout = ({cart,order,onCaptureCheckout,error,refreshCart}) => {
const classes = useStyles()
const [activeStep, setActiveStep] = useState(0)
const [shippingData,setShippingData] = useState({})
const[checkoutToken,setCheckoutToken] = useState(null)



 let Confirmation = () => order.customer? (
    <>
       <div>
         <Typography variant="h5">
             Thank You for your purchase {order?.customer.firstname} {order?.customer.lastname}!
         </Typography>
         <Divider className={classes.divider} />
         <Typography variant="subtitle">Order reference: {order.customer_reference}</Typography>
       </div>
       <br/>
       <Button component={Link} to="/" variant="outlined" type="button">Back To Home</Button>
    </>
) : (
   
  <div className={classes.spinner}>
    <CircularProgress />
  </div>
)


if(error) {
  <>
  <div>
    <Typography variant="h5" >Error: {error}</Typography>
    <br/>
     <Button component={Link} to="/" variant="outlined" type="button">Back To Home</Button>
  </div>
  </>
}



useEffect(() => {
   const generateToken = async () =>{
       try {
           const token = await commerce.checkout.generateToken(cart.id,{type:'cart'})
           setCheckoutToken(token)
             
        } catch (error) {
           
       }
   }
   generateToken()
}, [cart])


const nextStep = ()=>setActiveStep((prevActiveStep)=>prevActiveStep + 1)
const backStep = ()=>setActiveStep((prevActiveStep)=>prevActiveStep - 1)


const next = (data) => {
   setShippingData(data)
   nextStep()
   console.log(shippingData)
}


function getStepContent(step) {
  switch (step) {
    case 0:
      return  checkoutToken && <AddressForm checkoutToken={checkoutToken} next={next} backStep={backStep} />;
    case 2:
      return <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} refreshCart={refreshCart}/>
    case 1:
      return <Review checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} />;
    default:
      throw new Error('Unknown step');
  }
}



return (
    < >
     <CssBaseline/>
     <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
        <>
       <Confirmation />
        </>
            ) : (
              <React.Fragment>
                { getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {/*activeStep === 0 ? (
                    <Button variant="outlined" component={Link} to="/cart" className={classes.button}>
                      Back to cart
                    </Button>
                  ):(<Button variant="outlined" onClick={backStep} className={classes.button}>Back</Button>)*/}
               { /*  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
               </Button>*/}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
        </>
    )
}

export default Checkout
