import { Loader } from '@mantine/core'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <Loader size={24} color='black' />
    </div>
  )
}

export default LoadingSpinner
