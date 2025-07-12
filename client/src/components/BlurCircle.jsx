import React from 'react'

const BlurCircle = ( {top:top,left:left,right:right,bottom:bottom}) => {
  return (
    <div className='absolute -z-50 h-58 w-58 aspect-square rounded-ufll bg-primary/30 blur-3xl '
    style={{top:top, left:left, right:right, bottom:bottom}}>
      
    </div>
  )
}

export default BlurCircle;
