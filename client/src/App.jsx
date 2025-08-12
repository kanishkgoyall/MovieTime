import React from 'react'
import Navbar from './components/Navbar'
import {Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import Favourite from './pages/Favourite'
import MyBookings from './pages/MyBookings'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'  
import Dashboard from './pages/admin/Dashboard'
import {AddShow} from './pages/admin/AddShow'
import {ListShows} from './pages/admin/ListShows'
import {ListBookings} from './pages/admin/ListBookings'
import { Layout } from './pages/admin/Layout' // Adjust the import path as necessary
import { AppContext } from '../context/AppContext'
import { SignIn } from '@clerk/clerk-react'
import { Loader } from 'lucide-react'
import Loading from './components/Loading'

const App = () => { 
  const isAdminRoute=useLocation().pathname.startsWith('/admin')

  const {user}= AppContext();
  return (
    <>
    <Toaster/>
    {!isAdminRoute && <Navbar/>}  //if admin opened then navbar and footer wont be visible
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/movies/:id/:date" element={<SeatLayout />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/favorite" element={<Favourite />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/loading/:nextUrl" element={<Loading />} />
      <Route path="*" element={<Home />} /> {/* fallback route */}
      <Route path="/admin/*" element={user ? <Layout/> :(
        <div className='min-h-screen flex items-center justify-center'>
          <SignIn fallbackRedirectUrl={'/admin'} / >
        </div>
      )}> 
          <Route index element={<Dashboard/>} />
          <Route path="add-shows" element={<AddShow/>} />
          <Route path="list-shows" element={<ListShows/>} />
          <Route path="list-bookings" element={<ListBookings/>} />
      </Route>
    </Routes>    
    {!isAdminRoute && <Footer/>}
    
    </>

  )
}

export default App;

