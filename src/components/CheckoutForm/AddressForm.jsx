import React,{useState,useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'

import { commerce } from '../../lib/commerce'

import FormInput from './Checkout/CustomTextField'



const AddressForm = ({checkoutToken,next}) => {
const [shippingCountries,setShippingCountries ] =useState([])
const [shippingCountry,setShippingCountry ] =useState('')
const [ shippingRegions,setShippingRegions]= useState([])
const [ shippingRegion,setShippingRegion]= useState('')
const [ shippingOptions,setShippingOptions]= useState([])
const [ shippingOption,setShippingOption]= useState('')

 const methods = useForm()


  
 const countries = Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name}))
 const regions = Object.entries(shippingRegions).map(([code,name])=>({id:code,label:name}))

  

   const fetchShippingCountries = async (checkoutTokenId) => {
     const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
     setShippingCountries(countries)
     console.log(countries)
     setShippingCountry(Object.keys(countries)[0])
    }

   const fetchShippingRegions = async(CountryId) =>{
      const {subdivisions} =  await commerce.services.localeListSubdivisions(CountryId)
        setShippingRegions(subdivisions)
        setShippingRegion(Object.keys(subdivisions)[0])
    }


    const fetchShippingOptions = async (checkoutTokenId,country,region=null)=>{
        const responce = await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region})
        setShippingOptions(responce)
        responce && setShippingOption(responce[0].id)
    }

    useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
    }, [])

   useEffect(() => {
   if  (shippingCountry)  fetchShippingRegions(shippingCountry)
   }, [shippingCountry])

   useEffect(() => {
    if(shippingRegion) fetchShippingOptions(checkoutToken.id,shippingCountry,shippingRegion)
   }, [shippingRegion])


   
    return (
     <>
     <Typography variant="h6" gutterBottom>Shipping Address</Typography>
         <FormProvider {...methods}>
             <form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry, shippingRegion, shippingOption}))}>
                 <Grid container spacing={3}>
                       <FormInput required name='firstName' label='First name'/>
                        <FormInput required name='lastName' label='Last name'/>
                         <FormInput required name='address1' label='Address'/>
                          <FormInput required name='email' label='Email'/>
                            <FormInput required name='city' label='City'/>
                              <FormInput required name='ZIP' label='ZIP / Postal Code'/>
                             
                            <Grid  item xs={12} sm={6}>
                                   
                                <InputLabel>Shipping Country</InputLabel>
                                <Select value={shippingCountry} style={{display:'flex',padding:'12px'}} fullwidth onChange={(e)=>setShippingCountry(e.target.value)}>
                                    {countries.map((country)=>(
                                        <MenuItem   key={country.id} value={country.id}>
                                           {country.label}
                                        </MenuItem> )
                                    )}
                                       
                                </Select >
                            </Grid>  
                             <Grid item xs={12} sm={6} >
                                <InputLabel>Shipping Region</InputLabel>
                                <Select value={shippingRegion} style={{display:'flex',padding:'12px'}} fullwidth onChange={(e)=>setShippingRegion(e.target.value)}>
                                      {regions.map((region)=>(
                                            <MenuItem key={region.id} value={region.id}>
                                            {region.label}
                                        </MenuItem> 
                                      ))}
                                </Select >
                                </Grid>  
                                     <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                       {shippingOptions.map((option) => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})` })).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                    {item.label}
                     </MenuItem>
                  ))}
                  </Select>
                                </Grid>  
                 </Grid>
             </form>
         </FormProvider>
     </>
    )
}

export default AddressForm
 