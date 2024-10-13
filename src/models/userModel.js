import mongoose from 'mongoose'

const userSchema =  new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['ROLE_CUSTOMER','ROLE_RESTAURANT'],
        default:'ROLE_CUSTOMER',
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
    }],
    addresses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    }, 
    favroites:[{
        name: String,
        description: String,
        images:[]
    }], 
});

export default mongoose.model('User ',userSchema)