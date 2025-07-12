import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { assets, dummyDateTimeData } from '../assets/assets';
import Loading from '../components/Loading';
import isoTimeFormat from '../libs/isoTimeFormat';
import BlurCircle from '../components/BlurCircle';
import toast from 'react-hot-toast';
import { ArrowRightIcon } from 'lucide-react';
const SeatLayout = () => {
  const groupRows = [['A', 'B'], ['C', 'D'],[ 'E', 'F'],[ 'G', 'H'], ['I','J']];



  const {id,date}=useParams();
  const [show,setShow] = useState(null);
  const [selectedTime,setSelectedTime] = useState(null);
  const [selectedSeats,setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      });
    }
  }


  const handleSeatClick = (seatId) => {
    if (!selectedTime){return toast("Please select a time first", )}
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 4) {
      return toast("You can only select up to 4 seats", );
    }
    setSelectedSeats(prev=>prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId]);
  };    

// Function to render seats for a given row   
  const renderSeats = (row, count = 9) => (
  <div key={row} className="flex gap-2 mt-2">
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        return (
          <button key={seatId} onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${
              selectedSeats.includes(seatId) && "bg-primary text-white"}`}>
            {seatId}
          </button>
        );
      })}
    </div>
  </div>
);



  useEffect(()=>{
    getShow();
  },[])

 return show ? (
  <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-10 md:pt-50'>
    {/* Available Timings */}
    <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
      <p className='text-lg font-semibold px-6'>Available Timings</p>
      <div className='mt-5 space-y-1'>
        {show.dateTime[date].map((item) => (
          <div key={item.key} onClick={() => setSelectedTime(item)}
            className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
              selectedTime?.time === item.time
                ? "bg-primary text-white"
                : "hover:bg-primary/20"
            }`}
          >
            <ClockIcon className='w-4 h-4' />
            <p className='text-sm'>{isoTimeFormat(item.time)}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Seat Layout */}
    <div>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle bottom='0px' right='0px' />
        <h1 className='text-2xl font-semibold mb-8'>Seat Seat</h1>
        <img src={assets.seatLayout} alt="Seat Layout" className='w-full h-auto max-w-2xl mx-auto' />
        <p className='text-sm text-gray-500 mb-6'>SCREEN SIDE</p>

        <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
          <div className='grid grid-cols-2 md:grids-cols-1 gap-8 md:gap-2 mb-8'>
            {groupRows[0].map(row => renderSeats(row))}
          </div>


          
        <div className='grid grid-cols-2 gap-11'>
          {groupRows.slice(1).map((group, index) => (
            <div key={index} className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-8'>
              {group.map(row => renderSeats(row))}  
            </div>
          ))}
          </div>
        </div>


        <button onClick={() => navigate('/my-bookings')}
          className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition
           rounded-full font-medium cursor-pointer active:scale-95 '>
          Proceed To Checkout
          <ArrowRightIcon strokeWidth={3} className='w-4 h-4 ' />
        </button>

    </div>
  </div>
) : <Loading/>;

}

export default SeatLayout;

