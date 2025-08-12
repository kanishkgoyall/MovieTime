import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Loading = () => {

  const {nextUrl} = useParams();
  const navigate = useNavigate(); 

  // Redirect to the next URL after a short delay
  useEffect(()=>{
    if (nextUrl) {
      setTimeout(() => {
        navigate('/' + nextUrl);  //redirect to the next URL after 8sec
      }, 8000);
    }
  },[])
  return (
    <div className='flex items-center justify-center h-[80vh'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-primary border-2 '>
            
        </div>

      
    </div>
  )
}

export default Loading
