import React, { useState } from 'react'
import {Paper, Stepper, Step, StepLabel, CircularProgress, Typography, Divider,Button} from '@material-ui/core'

import useStyles from './styles'
import PaymentForm from '../PaymentForm'
import AddressForm from '../AddressForm'



const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm/>;
    case 1:
      return <PaymentForm/>
    case 2:
      return "Review";
    default:
      throw new Error('Unknown step');
  }
}


const Confirmation = () => (
<div>
    Confirmation
</div>
)

const Checkout = () => {

const classes = useStyles()

const [activeStep, setActiveStep] = useState(2)


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
                {getStepContent(2)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={()=>{console.log("button 1")}} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>{console.log("button 2")}}
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
