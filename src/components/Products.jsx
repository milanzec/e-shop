import React from "react"
import { Grid } from "@material-ui/core";
import Product from "./Products/Product/Product"


const products = [
    {id:1,name:"ametist",description:"plav",price:"$9",image:"https://via.placeholder.com/450x250.png"},
    {id:2,name:"malavit",description:"zelen",price:"$7",image:"https://via.placeholder.com/450x250.png"}
]


const Products = ()=>{
 return ( 
<main>
 <Grid container justify="center" spacing={4}> 
      {products.map((product)=>(    
    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
      <Product product={product} />
    </Grid>
    ))}
 </Grid>
</main>
 )
}



export default Products;