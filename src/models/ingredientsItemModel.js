import mongoose from "mongoose";


const IngredientsItemSchema = new mongoose.Schema({

    name:String,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'IngredientsItem',
    },
    refstaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
    },
    inStock:{
        type:Boolean,
        default:true,
    },
});

export default mongoose.model('IngredientsItem',IngredientsItemSchema)