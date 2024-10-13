import Food from '../models/foodModel.js'

export const createFood = async(req, restaurant) => {
    try {
        const food = new Food({
            foodCategory: req.category,
            creationDate: new Date(),
            description: req.description,
            images: req.images,
            mane:req.names,
            prices:req.price,
            isSeasonal:req.isSeasonal,
            isVegetarian:req.isVegetarian,
            restaurant:restaurant._id,
            ingredients:req.ingredients
        });
        await food.save();
        restaurant.foods.push(food._id);
        await restaurant.save();
        return food;
    } catch (error) {
        throw new Error(`Failed to create food:${error.message} `);
    }
}

export const deleteFood = async (foodId) => {
    try {
        const food =  await Food.findById({foodId});
        if(!food){
            throw new Error("Food not found with ID ");
        }
        await Food.findByIdAndDelete(foodId);

    } catch (error) {
        throw new Error(`Failed to delete food:${error.message} `);
    }
}

export const getRestaurantFood = async(
    restaurantId,
    vegetarian,
    nonveg,
    seasonal,
    foodCategory
) =>{
    try {
        let query = {restaurant: restaurantId};
        
        if(vegetarian == "true") query.isVegetarian = true;
        if(nonveg == "true") query.vegetarian = false;
        if(seasonal == "true") query.isSeasonal = true;
        if(foodCategory) query.foodCategory=foodCategory;
        
        const foods = await Food.find(query).populate([
            {path: "ingredients", populate: {path: "category", select:"name"}},
            "foodCategory",
            {path:"restaurant", select:"name _id"},
        ]);
        return foods;
    } catch (error) {
        throw new Error(`Failed to get restaurant foods ${error.message}`);
    }
}
    
export const searchFood = async(keyword) =>{
    try {
        let query = {};
        if(keyword) {
            query.$or = [
                {name: { $regex: keyword, $options:"i"}},
                {"foodCategory.name": { $regex: keyword, $options:"i"}},
            ];
        }

        const foods = await Food.find(query);
        return foods;
    } catch (error) {
        throw new Error(`Failed to search foods ${error.message}`);

    }
}

export const updateAvailabilityStatus = async (foodId) => {
    try {
        const food = await Food.findById(foodId).populate([
            {path: "ingrdients", populate:{path:"category", select:"name"}},
            "foodCategory",
            {Path : "restaurant", select : "name _id"},
        ]);
        if(!food){
            throw new Error(`Food not found with that Id ${error.message}`);
        }
        food.available =! food.available;
        await food.save();
        return food;
    } catch (error) {
        throw new Error(`Failed to update availability status of the food with ID: ${error.message} `);
    }
}

export const findFoodById = async(foodId) =>{
    try {
        const food = await Food.findById(foodId);
        if(!food){
                throw new Error(`Food not found with ID: ${error.message}`);
            }
            return food;
    } catch (error) {
            throw new Error(`Failed to find foods with ID ${error.message}`);
        }
    }