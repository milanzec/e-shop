import React from 'react';
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';

import useStyles from './style'
import logo from '../../assets/diamond.png'



const Navbar = ({cartItemsTotal}) => {
const classes = useStyles()

    return (
        <>
            <AppBar position="fixed" color="inherit" className={classes.appBar} >
               <Toolbar>
                   <Typography  variant="h6" className={classes.title} color="inherit">
                       <img src={logo} alt="" className={classes.image}/>
                       E-Shop
                   </Typography>
                   <div className={classes.grow}/>
                   <div className={classes.button}>
                       <IconButton color="inherit">
                            <Badge badgeContent={cartItemsTotal} color="secondary">
                                <ShoppingCart />
                            </Badge>
                       </IconButton>
                   </div>
               </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
