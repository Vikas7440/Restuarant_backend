import mongoose from "mongoose";


const CartItemSchema = new mongoose.Schema({
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart',
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Food'
    },
    quantity:Number,
    ingredeint:[String],
    totalPrice:Number,
});

export default mongoose.model('CartItem', CartItemSchema);