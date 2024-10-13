import mongoose from "mongoose"

const restaurantSchema = mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:String,
    description:String,
    cuisineType: String, // ex : "American", "French", etc... ###
    address:{
        type:mongoose.Schema.Types.ObjectId, // this is the id of the address object in the database #
        ref:"Address"
    },
    contactInformation:{},
    openingHours:String,
    order:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order',
        },
    ],
    numRating: Number,
    images:[String],
    registrationDate: {
         type : Date,
         default: Date.now, //()
    },
    open:Bollean,
    foods:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Food',
        },
    ],
});

export default mongoose.model("Restaurant", restaurantSchema);

