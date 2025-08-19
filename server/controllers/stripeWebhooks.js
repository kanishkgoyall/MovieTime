import stripe from "stripe"; 
import Booking from "../models/booking.jd";
import { inngest } from "../inngest/index.js";

export const stripeWebhooks = async (req, res) => {

    const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event;
    
    try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    } catch (err) {
        
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle the event
    try{
    switch (event.type) {
        case 'payment_intent.succeeded':{
        // Handle successful payment here
            const paymentintent=event.data.object;
            const sessionList = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentintent.id
            })

            const session =  sessionList.data[0];
            const {bookingId} = session.metadata;

            await Booking.findByIdAndUpdate(bookingId,{
                isPaid:true,
                paymentLink:""
            })


            //Send Confirmation Email
            await inngest.send({
                name:"app/show.booked",
                data:{bookingId}

            }) 
            break;

        }
        default:
            console.log("unhandled event type",event.type)
    }
    res.json({recieved:true})
    }catch(error){
        console.error("webhook processing error",error)
        res.status(500).send("Internal Server Error")
        

    }
}  