import {addToCart,updateCartItemQuantity,removeCartFromCart, CalculateCartTotals,findCartbyUserId,clearCart} from '../services/cartService.js';
import {findUserProfileByJWT} from '../services/userService.js';

export const addToCart = async (req, res) => {
    try {
        const user = req.user
        const cart = await addToCart(req.body, user._id);
        res.status(200).json(cart);
    } catch (error) {
        if(error instanceof Error)
        res.status(400).json({error:error.message});
    else
        res.status(500).json({error:"Internam Server Error"})
    }
};

export const updateCartItemQuantity = async (req, res) => {

    try {
        
    const { cartItemId, quantity} = req.body;
    const cart = await updateCartItemQuantity(
        cartItemId,
        quantity
    );
    res.status(200).json(cart);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({error:error.message});
        else
            res.status(500).json({error:"Internam Server Error"})
    }
};

export const removeCartFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await removeCartFromCart(id, user);
        res.status(200).json(cart);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({error:error.message});
        else
            res.status(500).json({error:"Internam Server Error"})
    }
};

// export const CalculateCartTotals = async (req, res) => {
//     try {
//         const { cartId, jwt } = req.query;
//         const user = await findUserProfileByJWT(jwt);
//         const cart = await findCartbyUserId(user.getId());
//         const total = await CalculAateCartTotals(cart);
//         res.status(200).json({error:error.message})
//     } catch (error) {
//         if(error instanceof Error)
//             res.status(400).json({error:error.message});
//         else
//             res.status(500).json({error:"Internam Server Error"})
//     }
// };

export const finduserCart = async (req, res) => {
    try {
        const user = req.user;
        const cart = await findCartbyUserId(user._id.toString());
        res.status(200).json(cart);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({error:error.message});
        else
            res.status(500).json({error:"Internam Server Error"})
    }
};

export const clearCart = async (req, res) => {
    try {
        const user = req.user;
        const cart =await clearCart(user);
        res.status(200).json(cart);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({error:error.message});
        else
            res.status(500).json({error:"Internam Server Error"})
    }
};
