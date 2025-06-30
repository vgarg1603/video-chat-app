import { LoaderIcon } from 'lucide-react'
import React from 'react'

const PageLoader = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
        <LoaderIcon className='animate-spin size-10 text-primary' />
    </div>
  )
}

export default PageLoader