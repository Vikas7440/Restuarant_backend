import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema({
    image:String,
    startedAt:String,
    endAt:String,
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
    },
    location:String,
});

export default mongoose.model('Events',EventsSchema)