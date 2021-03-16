import React from 'react'
import { Typography, Button, Card, CardContent, CardMedia, CardActions } from '@material-ui/core'

import useStyles from './styles'

const CartItem = ({item}) => {
    const classes = useStyles()
 

    return (
     <Card>
         <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
             <CardContent className={classes.cardContent} >
                 <Typography>{item.name}</Typography>
                 <Typography>{item.line_total.formatted_with_symbol}</Typography>
             </CardContent>
             <CardActions className={classes.cartActions}>
                 <div className={classes.buttons}>
                 <Button type="button" size="small" >+</Button>
                 <Typography>{item.quantity}</Typography>
                 <Button type="button" size="small">-</Button>
                 </div>
                 <Button variant="contained" type="button" color="secondary">Remove</Button>
             </CardActions>
       
     </Card>
    )
}

export default CartItem;
