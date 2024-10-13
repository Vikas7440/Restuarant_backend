import {searchFood,getRestaurantFood,createFood,deleteFood,searchFood,updateAvailabilityStatus} from '../services/foodServices.js';
import {findRestaurantById} from '../services/restaurantServices.js';
import userService from '../services/userService.js';

export const searchFood = async (req, res)=>{
    
    try {
        const {name} = req.query;
        const menuItem = await searchFood(name);
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({error:"Internam server Error"});
    }
}

export const getMenuItemByRestaurant = async(req, res)=>{

    try {
        const { restaurantId } = req.params;
    const { vegetarian, seasonal, nonveg, food_category } = req.query;
    const menuItems = await getRestaurantFood({
        restaurantId,
        vegetarian,
        nonveg,
        seasonal,
        food_category
    });
    res.status(200).json(menuItems);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error:error.message});
        }else{
            res.status(500).json({error:"Internal server error"});
        }
    }
}

export const createItem = async(req, res)=>{

    try {
        const item = req.body;
        const user = req.user;

        const restaurant = await findRestaurantById(item.restaurantId);
        const menuItem = await createFood(item, restaurant);
        res.status(200).json(menuItem);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error:error.message});
        }else{
            res.status(500).json({error:"Internal server error"});
        }
    }
}

export const deletItem = async(req, res)=>{

    try {
        const { id } = req.params;
        const user = req.user;
        await deleteFood(id);
        res.status(200).json({message: "Menu Item Deleted "});
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error:error.message});
        }else{
            res.status(500).json({error:"Internal server error"});
        }
    }
}

export const updateAvailabilityStatus = async(req, res)=>{

    try {
        const { id } = req.params;
        const menuItem = await updateAvailabilityStatus(id);
        res.status(200).json(menuItem);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error:error.message});
        }else{
            res.status(500).json({error:"Internal server error"});
        } 
    }
}