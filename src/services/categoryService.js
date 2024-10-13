import Category from '../models/categoryModel.js';
import Restaurant from '../models/restaurantModel.js';

export const createCategory = async(name, userId) =>{
    try {
        const restaurant = await Restaurant.findOne({owner: userId});
        if(!restaurant){
            throw new Error ("Restaurant not found with this id");
        }

        const createCategory =  new Category({ name, restaurant: restaurant._id})
        await createCategory.save();
        return createCategory;
    } catch (error) {
        throw new Error ("Failed to create Category");

    }
}

export const findCategoryByRestaurantId = async(restaurantId) =>{
    try {
        const category = await Category.findById(restaurantId);
        if(!category) {
            throw new Error ("restaurantId Category not found with this id");
        return category;
        }
    } catch (error) {
        throw new Error ("restaurantId Category not found with this id...");

    }
}

export const findCategoryById = async(categoryId) =>{
    try {
        const category = await Category.findById(categoryId);
        if(!category) {
            throw new Error ("Category not found with this id");
        return category;
        }
    } catch (error) {
        throw new Error ("Category not found with this id...");

    }
}




