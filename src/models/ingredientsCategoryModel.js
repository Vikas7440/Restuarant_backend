import mongoose from "mongoose";
import { restart } from "nodemon";

const ingredeintCategorySchema = new mongoose.Schema({

    name:String,
    restaurant: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
    },
    ingredients:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'IngredientsItem',
    }]    
})

export default mongoose.model('IngredientsItem',ingredeintCategorySchema)