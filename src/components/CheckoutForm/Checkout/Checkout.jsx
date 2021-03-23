import React, { useState,useEffect } from 'react'
import {Paper, Stepper, Step, StepLabel, CircularProgress, Typography, Divider,Button} from '@material-ui/core'

import { commerce } from '../../../lib/commerce'
import useStyles from './styles'
import PaymentForm from '../PaymentForm'
import AddressForm from '../AddressForm'



const steps = ['Shipping address', 'Payment details', 'Review your order'];










  const Confirmation = () => (
      <div>  
         Confirmation
      </div>
)




const Checkout = ({cart}) => {
const classes = useStyles()
const [activeStep, setActiveStep] = useState(1)
const[checkoutToken,setCheckoutToken] = useState(null)


useEffect(() => {
   const generateToken = async () =>{
       try {
           const token = await commerce.checkout.generateToken(cart.id,{type:'cart'})
           console.log(token)
           setCheckoutToken(token)
             
        } catch (error) {
           
       }
   }

   generateToken()
}, [cart])

function getStepContent(step) {
  switch (step) {
    case 0:
      return  checkoutToken && <AddressForm checkoutToken={checkoutToken}/>;
    case 1:
      return <PaymentForm/>
    case 2:
      return "Review";
    default:
      throw new Error('Unknown step');
  }
}



return (
        < >
    
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
                { getStepContent(0)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick='' className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick=''
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
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
