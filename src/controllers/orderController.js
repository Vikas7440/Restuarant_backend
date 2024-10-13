import {createOrder, cancelOrder,getOrderOfRestaurant,updateOrder} from '../services/orderService.js';
import {orderService} from '../services/userService.js';

//customer order api
export const createorder = async(req,res) =>{
    try {
        const order = req.body;
        const user = req.user;
        if(!order) throw new Error ("Please provide valid request body");
        const paymentResponse = await createOrder(order, user);
        res.status(200).json(PaymentResponse);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({error:"Internal Server Error"});    
        }
    }
}

export const getallUserOrder = async(req,res) =>{
    try {
        user = req.user;
        const userOrder = await getuserOrders(user._id);
        res.status(200).json(userOrder);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({error:"Internal Server Error"});    
        } 
    }
}

//adminordercontroller
export const deleteOrder = async(req,res) =>{
    try {
        const { orderId} = req.params;
        await cancelOrder(orderId);
        res.status(200).json({message: "oreder deleted"});
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({error:"Internal Server Error"});    
        }  
    }
};

export const getAllrestaurantOrder = async(req,res) =>{
    try {
        const { restaurantId } = req.params;
        const { order_status} = req.query;
        const orders = await getOrderOfRestaurant(
            restaurantId,
            order_status
        );
        res.status(200).json(orders);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({error:"Internal Server Error"});    
        } 
    }

};

export const updateOrder = async(req,res) =>{
    try {
        const { orderId, orderStatus} = req.params;
        const order  =await updateOrder(orderId,orderStatus);
      
        res.status(200).json(order);
    } catch (error) {
      
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({error:"Internal Server Error"});    
        } 
    }
};

