import React,{useEffect} from 'react'
import {Container,Typography,Button,Grid} from '@material-ui/core'
import CartItem from './CartItem/CartItem'

import useClasses from './styles'

const Cart = ({cart, onUpdateCartQnty, onRemoveFromCart, onEmptyAllCart}) => {

 

 const classes = useClasses()





  const EmptyCart = () =>(
    <Typography variant="subtitle1" >You have no items</Typography>
  )

  

  const FilledCart = () =>(
   <div>
     <Grid container spacing={3}>
       {cart.line_items.map((item)=>(
         <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <CartItem item={item}
              onUpdateCartQnty={onUpdateCartQnty} 
              onRemoveFromCart={onRemoveFromCart} />
         </Grid>
       ))}
     </Grid>
     <div className={classes.cardDetails}>
       <Typography variant="h4" >Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
       <div>
         <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={onEmptyAllCart}>Empty Card</Button>
         <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
       </div>
     </div>
   </div>
  )  

  if(!cart.line_items?.length) return "Loading..."

  return (
  <Container>
    <div className={classes.toolbar}/>
       <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
       { !cart.line_items?.length && null? <EmptyCart />:<FilledCart />}
  </Container>
  )
}

export default Cart
