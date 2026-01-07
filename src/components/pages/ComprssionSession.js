import React, { useContext, useEffect } from 'react'
import { DContext } from '../../context/Datacontext'

export const ComprssionSession = () => {
    const { BeURL }=useContext(DContext)
    useEffect(()=>{
        if(BeURL){
            fetch(`${BeURL}/compressor`,{
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
    <div>ComprssionSession</div>
  )
}
