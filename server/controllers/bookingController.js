import { use } from "react";
import Show from "../models/Show.js"
import Booking from "../models/booking.js";
import { User } from "@clerk/express";
import stripe from "stripe";
//Function to check availability of selected seats for a show
const checkSeatAvailability = async (showId, selectedSeats) => {

    try {
        const showData= await Show.findById(showId);
        if (!showData) return false;

        const occupiedSeats= showData.occupiedSeats;

        const isAnySeatTaken = selectedSeats.some(seat=>occupiedSeats[seat]);

        //IF SEAT IS TAKEN, OCCUPIED SEATS RETURN TRUE BUT WE DONT WANT THAT SO WE MAKE !isAnySeatTaken FALSE;

        return !isAnySeatTaken;
    } catch (error) {
        console.log(error.message);
        return false;

        
    }

}


export const createBooking = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {showId,selectedSeats} = req.body;
        const {origin}= req.headers;

        //check if seats are available
        const isAvailable = await checkSeatAvailability(showId, selectedSeats);
        if (!isAvailable) {
            return res.json({success:false,message:"Selected seats are not available"});
        } 


        //get the show details
        const showData = await Show.findById(showId).populate('movie');

        //create a new booking
        const booking = await booking.create({
            user: userId,
            show: showId,
            amount: showData.ShowPrice * selectedSeats.length,
            bookedSeats: selectedSeats,
            // paymentLink: `${origin}/payment?showId=${showId}&amount=${showData.price * selectedSeats.length}&userId=${userId}`
        });

        selectedSeats.map((seat) => {
            showData.occupiedSeats[seat] =userId;
        })

        showData.markModified('occupiedSeats');
        await showData.save();

        //stripe gateway initialize

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //Creating line items to for stripe

        const line_items =[{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: showData.movie.title,
                },
                unit_amount: Math.floor(booking.amount) * 100 
            },
            quantity: 1
        }]


        //fnx to generate payment link
        const session = await stripeInstance.checkout.sessions.create({

            
            success_url: `${origin}/loading/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                bookingId: booking._id.toString(),
                
            },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 mins expiry 

        });
//gpt search
        booking.paymentLink = session.url;
        await booking.save();

        res.json({
            success: true,
            url: session.url
        });






    } catch (error) {
        console.log(error.message);
        res.json({success:true,message:error.message});

    }
}


export const getOccupiedSeats=async(req,res)=>{
    try {
        const {showId}= req.params;
        const showData= await Show.findById(showId);
        const occupiedSeats= Object.keys(showData.occupiedSeats);




        res.json({success:true,occupiedSeats});
    } catch (error) {
        console.log(error.message);
        res.json({success:true,message:error.message});

    }
}