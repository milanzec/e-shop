import React from 'react'
import {Container,Typography,Button,Grid} from '@material-ui/core'
import useClasses from './styles'

const Cart = ({cart}) => {


  const classes = useClasses()

  const EmptyCart = () =>(
    <Typography variant="subtitles" >You have no items</Typography>
  )

  

  const CardOfItems = () =>(
   <div>
     <Grid container spacing={3}>
       {cart.line_items.map((item)=>(
         <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
           <div>{item.name}</div>
         </Grid>
       ))}
     </Grid>
     <div className={classes.cardDetails}>
       <Typography variant="h4" >Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
       <div>
         <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Card</Button>
         <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
       </div>
     </div>
   </div>
  )  

  if(Object.keys(cart).length && !cart.line_items.length) return 'Loading...'

  return (
  <Container>
    <div className={classes.toolbar}/>
       <Typography className={classes.title} variant="h3" >Your Shopping Cart</Typography>
       { Object.keys(cart).length && !cart.line_items.length ? <EmptyCart />:<CardOfItems />}
  </Container>
  )
}

export default Cart
