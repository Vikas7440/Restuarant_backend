import Cart from '../models/cartModel.js';
import cartItem from '../models/cartItem.js';
import Food from '../models/foodModel.js';
import cartItem from '../models/cartItem.js';
import cartItem from '../models/cartItem.js';

export const getCartItems = async (user) => {

    const cart = new Cart({customer: user});
    const createCart = await cart.save();
    return createCart;
}

export const findCartbyUserId = async (userId) => {
 
    let cart = await Cart.findOne({customer: userId}).populate([
        {
            path:"items",
            populate:{
                path:"food",
                populate:{ path:"restaurant", select:"_id"},
            },
        },
    ]);
    if(!cart){
        throw new Error("No Cart Found",userId);
    }
    let cartItems = await cartItem.find({cart:cart._id}).populate("food");

    let totalPrice = 0 ;
    let totalDistcountprice = 0 ;
    let totalItem = 0;

    for(const item of cart.items) {
        totalPrice += item.price;
        totalDistcountprice  += item.discountPrice;
        totalItem += item.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.totalDistcountprice = totalDistcountprice;
    cart.discount = totalPrice - totalDistcountprice;

    return cart;    

}

export const addToCart = async (req, userId) => {
    const cart = await Cart.findOne({customer:userId});
    const food = await Food.findById(req.menuItemId);

    const isPresent = await cartItem.findOne({
        cart: cart._id,
        food: food._id,
        userId,
    });

    if(!isPresent){
        const cartItem = new cartItem({
            food:food._id,
            cart:cart._id,
            quantity:1,
            userId,
            totalPrice: food.price,
        });

        const createItem = await cartItem.save();
        cart.items.push(createItem);
        await cart.save();
        return createItem;   
    }
    return isPresent;
}

export const updateCartItemQuantity = async (cartItemId, quantity) => {

    const cartItem = await cartItem.findById(cartItemId).populate([
        {path:"food", populate: {path:"restaurant", select:"_id"}},
    ]);
    if(!cartItem) {
        throw new Error(`No Cart Item Found with Id:${cartItemId}`);
    }

    cartItem.quantity = quantity;
    cartItem.totalPrice =quantity * cartItem.food.price;
    await cartItem.save();
    return  cartItem;
}

export const removeCartFromCart = async (cartItemId, user) => {
    const cart = await Cart.findOne({customer:user._id});    
   
    if(!cart){
        throw new Error("No Cart Found",user._id );
    }

    cart.items = cart.items.filter((item) => !item.equals(cartItemId));
    await cart.save();
    return cart;
}

export const clearCart = async (user) => {
    const cart = await Cart.findOne({customer: user._id});
    if(!cart){
        throw new Error("No Cart Found",user._Id);   
    }

    cart.items = [];
    await cart.save();
    return cart;
}

export const CalculateCartTotals = async (cart) => {
    try {
        let total = 0;
        for(let cartItem of cart.items) {
            total += cartItem.food.price * cartItem.quantity;
        }
        return total;
    } catch (error) {
        throw new  Error(error.message);
    }
}


