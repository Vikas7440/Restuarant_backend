import {createIngredientsCategory, createIngredietnsItem, updateStoke, findRestaurantIngredients, findIngredientsCategoryByRestaurantId} from '../services/ingrediteService.js';

export const createingredientsCategories = async (req, res)=>{
    try {
        const {name, restaurantId} = req.body;
        const item = await createIngredientsCategory(name, restaurantId);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({error:"Internal server error ", message:error.message})
    }
};

export const createIngredient = async (req, res)=>{
    try {
        const {restaurantId, name, ingredientsCateoryId } = req.body;
        const item = await createIngredietnsItem(
            restaurantId, name, ingredientsCateoryId
        );
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({error:"Internal server error ", message:error.message})
    }
};

export const updateStokes = async (req, res)=>{
    try {
        const {id} = req.params;
        const item = await updateStoke(id);
    } catch (error) {
        return res.status(500).json({error:"Internal server error ", message:error.message})
    }
};

export const restaurantIngredients = async (req, res)=>{
    try {
        const { id } = req.params;
        const item = await findRestaurantIngredients(id);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({error:"Internal server error ", message:error.message})
    }
};

export const restaurantIngredientsCategories = async (req, res)=>{
    try {
        const {id} = req.params;
        const item = await findIngredientsCategoryByRestaurantId(id);
        res.statu(200).json(item);
    } catch (error) {
        res.status(500).json({error:"Internal server error ", message:error.message})
    }
};
