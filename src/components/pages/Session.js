import React from 'react'
import { Compressor } from './Compressor'
import { HeatTherapy } from './HeatTherapy'
import { Vibration } from './Vibration'

export const Session = () => {
  return (
    <div className=' space-y-10'>
      <Compressor />
      <HeatTherapy />
      <Vibration />
    </div>
  )
}
