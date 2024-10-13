import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({

    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
    },
    totalAmount:Number,
    orderStatus:String,
    createdAt:{
        type:Date,
        default:Date.now,
    },
    deliveryAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address',
    },
    Items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',   
    }],
    totalItem:Number,
    totalPrice:Number,
})

export default mongoose.model('Order',OrderSchema)