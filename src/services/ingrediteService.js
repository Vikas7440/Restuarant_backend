import IngredientsCategory from '../models/ingredientsCategoryModel.js';
import IngredientsItem from '../models/ingredientsItemModel.js';
import Restaurant from '../models/restaurantModel.js';

export const createIngredientsCategory = async(name, restaurantId) => {
    try {
        let category = await IngredientsCategory.findOne({
            restaurant: restaurantId,
            name: name,
        });
        if(category){
            return category;
        }

        const restaurant = await Restaurant.findById(restaurantId);
        if(!restaurant){
            throw new Error ("Restaurant not found with this Id ");
        }

        category = new IngredientsCategory({
            name:name,
            restaurant: restaurantId,
        });
        const createdCategory = await category.save();
        return createdCategory;
    } catch (error) {
        throw new Error ("Failed to create ingredient s category ");
    }
}

export const findIngredientsCategoryById = async (id) => {
    try {
        const category = await IngredientsCategory.findById(id);
        if(!category){
            throw new Error ("Ingredients category not found with ID");
        }
       return category; 
    } catch (error) {
        throw new Error ("Failed to find ingredients category ");

    }
}

export const findIngredientsCategoryByRestaurantId = async (restaurantId) => {
    try {
        const categories = await IngredientsCategory.find({restaurant:restaurantId})
        return categories;
    } catch (error) {
        throw new Error ("Failed to find ingredients category for restaurant with id");

    }
}

export const findRestaurantIngredients = async (restaurantId) => {
    try {
        const item = await IngredientsItem.find({restaurant:restaurantId})
        .populate("category");
        return item;
    } catch (error) {
        throw new Error ("Failed to find ingredients for restaurant with id");

    }
}

export const createIngredietnsItem = async (restaurantId,ingredientName,IngredientsCategoryId) => {
    try {
        const category = await this.findIngredientsCategoryById(IngredientsCategoryId);
        if(!category){
            throw new Error ("Ingredientns item not found with ID");
        }

        let item = await IngredientsItem.findOne({
            restaurant:restaurantId,
            name:ingredientName,
            category:category._id,
        });
        if(item){
            return item;
        }

        const restaurant = await Restaurant.findById(restaurantId);

        if(!restaurant){
            throw new Error ("Restaurannt not found with ID");
        }

        item = new IngredientsItem({
            name: ingredientName,
            restaurant: restaurantId,
            category: category._id,
        });
        const savedItem = await item.save();
        category.ingredients.push(savedItem._id);
        await category.save();
        return savedItem;
    } catch (error) {
        throw new Error ("Failed to create ingredits item ");

    }
}

export const updateStoke = async (id) => {
    try {
        const item = await IngredientsItem.findById(id).populate("category");
        if(!item) {
            throw new Error ("Ingredients not found with ID");
        }
        item.inStock = !item.inStock;
        await item.save();
        return item;
    } catch (error) {
        throw new Error ("Failed to update Ingredients  stock item not found with ID");
    }
}