import React from 'react';
import {Link, useLocation} from 'react-router-dom'
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';

import useStyles from './style'
import logo from '../../assets/diamond.png'



const Navbar = ({cartItemsTotal}) => {
const location  = useLocation() 
const classes = useStyles()

    return (
        <>
            <AppBar position="fixed" color="inherit" className={classes.appBar} >
               <Toolbar>
                   <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                       <img src={logo} alt="" className={classes.image}/>
                       E-Shop
                   </Typography>
                   <div className={classes.grow}/>
                  {location.pathname==="/" && ( <div className={classes.button}>
                       <IconButton component={Link} to="/cart" color="inherit" aria-label="Show cart items">
                            <Badge badgeContent={cartItemsTotal} color="secondary">
                                <ShoppingCart />
                            </Badge>
                       </IconButton>
                   </div>)} 
                  
               </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
