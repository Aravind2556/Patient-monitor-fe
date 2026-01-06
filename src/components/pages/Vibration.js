import React, { useContext, useEffect } from 'react'
import { DContext } from '../../context/Datacontext'

export const Vibration = () => {
            const { BeURL }=useContext(DContext)
            useEffect(()=>{
                if(BeURL){
                    fetch(`${BeURL}/vibration`,{
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
    <div>Vibration</div>
  )
}
