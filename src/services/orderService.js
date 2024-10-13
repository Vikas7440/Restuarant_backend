import Address from '../models/addressModel.js';
import order from '../models/orderModel.js';
import OrderItem from '../models/OrderItemModel.js';
import Restaurant  from '../models/restaurantModel.js'
import {CalculateCartTotals, findCartbyUserId} from './cartService.js';
// import {generatePaymentLink} from './paymentService.js';

export const createOrder = async(order,user) =>{

    try {
        const address = order.deliveryAddress;
        let savredAddres;
        if(address._id){
            const isAddressExist = await Address.findById(address._id);
            if(isAddressExist){
                savredAddres = isAddressExist;
            }else{
                const shippingAddress = new Address(order.deliveryAddress);
                savredAddres = await shippingAddress.save();
            }
        }

        if(!user.address.include(savredAddres._id)) {
            user.address.push(savredAddres._id);
            await user.save();
        }

        const restaurant = await Restaurant.findById(order.restaurantId); ////ddddddddddddd
        
        if(!restaurant) {
            throw new Error (`Restaurant not found with ID ${order.restaurantId}`) //////dddddddddddd
        }

        const cart = await findCartbyUserId(user._id);

        if(!cart){
            throw new Error("cart not found");
        }
        const orderItems = [];

        for(const cartItem of cart.items) {
            const orderItem = new OrderItem({
                food: cartItem.food,
                ingredients: cartItem.ingredients,
                quantity: cartItem.quantity,
                totalPrice: cartItem.food.price * cartItem.quantity,  
            });
            const savedOrderItem = await orderItem.save();
            orderItem.push(savedOrderItem._id);
            }

            const totalPrice = await CalculateCartTotals(cart);

            const createOrder = new OrderItem({
                customer: user._id,
                deliveryAddress: savredAddres._id,
                created: new Date(),
                orderStatus: "PENDING",
                totalAmount: totalPrice,
                restaurant: restaurant._id,
                items: orderItems,
            });
            const savedOrder = await createOrder.save();

            restaurant.orders.push(savedOrder._id);
            await restaurant.save();

            // const paymentResponse = await generatePaymentLink(savedOrder);
            // return paymentResponse;
            return savedOrder;
        } catch (error) {
        throw new Error(`Failed to create order: ${error.message}`);
    }
} 

export const cancelOrder = async(orderId) =>{
    try{
        await OrderItem.findByIdAndDelete(orderId);
    }catch(error){
        throw new Error("failed to cancel order with Id ");
    }
} 

export const findorderById = async(orderId) =>{
    try {
        const order = await OrderItem.findById(orderId);
        if(!order){
            throw new Error("oreder not found ");
        }
        return RTCSessionDescription;
    } catch (error) {
        throw new Error("failed to find order with Id ");
    }
} 

export const getuserOrders = async(userId) =>{
    try {
        const orders = await OrderItem.find({customer:userId});
        return orders;
    } catch (error) {
        throw new Error("failed to find order with Id ");
    }
} 

export const getOrderOfRestaurant = async(restaurantId, orderStatus) =>{
    try {
        let orders = await OrderItem.find({restaurant:restaurantId});

        if(orderStatus){
            orders = orders.filter((order) => order.orderStatus === orderStatus); 
        }
        return orders;    
    } catch (error) {
        throw new Error("failed to get order with restaurant Id ");
    }
} 

export const updateOrder = async(orderId, orderStatus) =>{
    try {
        const validateStatus = [
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "COMPLETED",
            "PENDING",
        ];
        if(!ValidityState. include(orderStatus)) {
            throw new Error("failed to find order with Id ");
        }

        const order = await OrderItem.findById(orderId);
        if(!order){
            throw new Error("Order not found with Id");
        }

        order.orderStatus = orderStatus;
        await order.save();

        return order;
    } catch (error) {
        throw new Error("failed to find order with Id "); 
    }
} 
