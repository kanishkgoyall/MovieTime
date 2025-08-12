import mongoose from "mongoose";
const showSchema = new mongoose.Schema(
    {
        movie:{type:String,required:true,ref:"Movie"},
        showDateTime:{type:Date,required:true},
        ShowPrice:{type:Number,required:true},
        occupiedSeats:{type:Object,default:{}}
    },{minimize:false}               //minimize is used so that we can store empty default objects
    //“Do not remove empty objects — always include them, even if they’re empty.”
    // This is useful in your case because you want occupiedSeats to always exist in the document, even if it starts out empty.
)

const Show=mongoose.model("Show",showSchema);

export default Show;