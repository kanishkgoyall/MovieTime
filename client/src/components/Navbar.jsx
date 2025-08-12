import React from 'react'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../pages/Favourite.jsx' 
import '../pages/Movies.jsx' 
import {useAppContext} from '../../context/AppContext'
import { useState } from 'react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {

  const {favoriteMovies}=useAppContext();

  const [isOpen, setIsOpen] = useState(false); 
  const navigate=useNavigate()
  const {user}=useUser()
  const {openSignIn}=useClerk()
  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-10 lg:px-36 py-5'>
      

      <Link to='/' className='max-md:flex-1'>
      <img src={assets.logo} alt="" className='w-36 h-auto' />
      </Link>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isopen?'max-md:w-full':'max-md:w-0'}`}>
      <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" onclick={()=>setIsOpen(!isOpen)}/>

      <Link onclick={()=>{scrollTo(0,0);setIsOpen(false)}} to='/'> Home</Link>
      <Link onclick={()=>{scrollTo(0,0);setIsOpen(false)}} to='/movies'> Movies</Link>
      <Link onclick={()=>{scrollTo(0,0);setIsOpen(false)}} to='/'> Releases</Link>
      <Link onclick={()=>{scrollTo(0,0);setIsOpen(false)}} to='/'> Theatres</Link>
      {favoriteMovies.length>0 && <Link onclick={()=>{scrollTo(0,0);setIsOpen(false)}} to='/favourite'> Favourite</Link> }
      </div>
      <div className='flex items-center gap-7'>
        <SearchIcon className='max-md:hidden w-8 h-8 cursor-pointer ' />

        {
          !user ?
           (<button onclick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
          Login
        </button>) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15} onclick={()=>{navigate('/my-bookings')}}/>} />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>
      <MenuIcon onclick={()=>{setIsOpen(!isOpen)}} className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer ' />
    </div>
  )
}

export default Navbar;
