import { findUserProfileByJWT } from '../services/userService.js'
import { createRestaurant,
        deleteRestaurant,
        getRestaurantByUserId, 
        searchRestaurant, 
        udpdateRestaurantStatus, 
        getAllRestaurant,
        findRestaurantById,
        addTofavorite
    } from '../services/restaurantServices.js';

export const createRestaurant = async (req,res) =>{
    try {
        
        const user = req.user;
        const restaurant = await createRestaurant(
            req.body,
            user
        );
    } catch (error) {
        res.status(400).send({error:error.message});
    }
}

export const deleteRestaurantById = async(req,res) =>{
    try {
        const {id} = req.params;

        const user = req.user;
        await deleteRestaurant(id);
        res.status(200).send({
            success:true,
            message: "Restaurant Deleted Successfully"
        });

    } catch (error) {
        if(error instanceof Error) {
            res.status(400).send({error: error.message});
        } else {
            res.status(500).send({error: "Internal Server Error"});
            console.log("Error", error);
        }
    }
}

export const udpdateRestaurantStatus = async(req,res) =>{
    try {
        const { id } = req.params;
        const restaurant = await udpdateRestaurantStatus(id.toString());
        res.status(200).json(restaurant)
    } catch (error) {
        if(error instanceof Error) {
            res.status(400).send({error: error.message});
        } else {
            res.status(500).send({error: "Internal Server Error"});
            console.log("Error", error);
        }       
    }
}

export const findRestaurantByUserId = async (req, res) => { 
    try {
        const user = req.user;
        const restaurant = await getRestaurantByUserId(user._id);
        res.status(200).json(restaurant)
    } catch (error) {
        if(error instanceof Error) {
            res.status(400).send({error: error.message});
        } else {
            res.status(500).send({error: "Internal Server Error"});
            console.log("Error", error);
        }
    }
}

export const findRestaurantNyName = async (req, res) =>{
    try {
        const {keyword} = req.quary;
        const restaurant = await searchRestaurant(keyword);
        res.status(200).json(restaurant)
    } catch (error) {
            res.status(500).json({error: "Internal Server Error"});
            console.log("Error", error);
    }
}

export const getAllRestaurant = async (req, res) => {
    try {
        const restaurant = await getAllRestaurant();
        res.status(200).send({
            success: true,
            message:"Restaurants Listed Successfully",
            restaurants:restaurant
        })
    } catch (error) {
            res.status(500).json({ error: "Internal server error " });
    }
}

export const findRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await findRestaurantById(id);
        res.status(200).json(restaurant);
    } catch (error) {
        if(error instanceof Error) {
            res.status(400).send({error: error.message});
        } else {
            res.status(500).send({error: "Internal Server Error"});
            console.log("Error", error);
        }
    }
}

export const addTofavorites = async (req, res) => { 
    try {

        const { id } = req.params;
        const user = req.user;
        const restaurant = await addTofavorite(id, user);
        res.status(200).json(restaurant);
    } catch (error) {
        if(error instanceof Error) {
            res.status(400).send({error: error.message});
        } else {
            res.status(500).send({error: "Internal Server Error"});
            console.log("Error", error);
        }
    }
}

