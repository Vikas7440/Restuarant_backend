import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({

    name:String,
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
    },
});

export default mongoose.model('Category',CategorySchema)