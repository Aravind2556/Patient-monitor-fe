import React, { useContext, useEffect } from 'react'
import { DContext } from '../../context/Datacontext'

export const HeatTherapy = () => {
        const { BeURL }=useContext(DContext)
    
        useEffect(()=>{
            if(BeURL){
                fetch(`${BeURL}/therapy`,{
                    method : 'GET',
                    credentials : 'include'
                })
                .then(res=>res.json())
                .then(data=>{
                    alert(data.message)
                })
            }
        }, [BeURL])
    
  return (
    <div>HeatTherapy</div>
  )
}
