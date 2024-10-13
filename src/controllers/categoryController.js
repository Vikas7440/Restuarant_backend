import { createCategory, findCategoryByRestaurantId } from '../services/categoryService';
// import {} from '../services/userService.JS';

export const createCategory = async(req, res) =>{
    try {
        const category = req.body;
        const user = req.user;
        const createdCategory = await createCategory(category.name, user._id);
        res.status(200).json(createdCategory);
    } catch (error) {
        if(error instanceof Error) {
            res.status(400).send({error: error.message});
        } else {
            res.status(500).send({error: "Internal Server Error"});
            console.log("Error", error);
        }
    }
}

export const getRestaurantsCategory = async(req, res) =>{
    try {
        const { id } = req.params;
        const user = req.user;
        const categories = await findCategoryByRestaurantId(id);
        res.status(200).json(categories);

    } catch (error) {
        if(error instanceof Error) {
            res.status(400).send({error: error.message});
        } else {
            res.status(500).send({error: "Internal Server Error"});
            console.log("Error", error);
        }
    }
}


