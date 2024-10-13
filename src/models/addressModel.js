import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({

    name: String,
    streetAddress:String,
    city:String,
    state:String,
    postalCode:String,
    country:String,
});

export default mongoose.model("Address", addressSchema);