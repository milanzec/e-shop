import React,{useState,useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'

import { commerce } from '../../lib/commerce'

import FormInput from './Checkout/CustomTextField'



const AddressForm = ({checkoutToken}) => {
const [shippingCountries,setShippingCountries ] =useState([])
const [shippingCountry,setShippingCountry ] =useState('')
const [ shippingRegions,setShippingRegions]= useState([])
const [ shippingRegion,setShippingRegion]= useState('')
const [ shippingOptions,setShippingOptions]= useState([])
const [ shippingOption,setShippingOption]= useState('')

 const methods = useForm()
  
 const countries = Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name}))

  

 const fetchShippingCountries = async (checkoutTokenId) => {
     const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
     setShippingCountries(countries)
     setShippingCountry(Object.values(countries)[4])
    
   
    }

    useEffect(() => {
    fetchShippingCountries(checkoutToken.id)

    }, [])

    console.log(shippingCountries)
    return (
     <>
     <Typography variant="h6" gutterBottom>Shipping Adress</Typography>
         <FormProvider {...methods}>
             <form onSubmit=''>
                 <Grid container spacing={3}>
                       <FormInput required name='firstName' label='First name'/>
                        <FormInput required name='lastName' label='Last name'/>
                         <FormInput required name='address1' label='Address'/>
                          <FormInput required name='email' label='Email'/>
                            <FormInput required name='city' label='City'/>
                              <FormInput required name='ZIP' label='ZIP / Postal Code'/>
                                <Grid xs={12} sm={6}>
                                <InputLabel>Shipping Country</InputLabel>
                                <Select value={shippingCountry} fullwidth onChange={(e)=>setShippingCountry(e.target.value)}>
                                    {countries.map((country)=>(
                                    <MenuItem key={country.id} value={country.label}>
                                          {country.label}
                                        </MenuItem> )
                                    )}
                                       
                                </Select >
                                </Grid>  
                                     <Grid xs={12} sm={6}>
                                <InputLabel>Shipping Region</InputLabel>
                                <Select value='drzava' fullwidth onChange=''>
                                        <MenuItem key={1} value='nekivalue'>
                                            Select Me
                                        </MenuItem> 
                                </Select >
                                </Grid>  
                                     <Grid xs={12} sm={6}>
                                <InputLabel>Shipping Options</InputLabel>
                                <Select value='drzava' fullwidth onChange=''>
                                        <MenuItem key={1} value='nekivalue'>
                                            Select Me
                                        </MenuItem> 
                                </Select >
                                </Grid>  
                 </Grid>
             </form>
         </FormProvider>
     </>
    )
}

export default AddressForm
 