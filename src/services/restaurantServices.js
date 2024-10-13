import restaurantModel from '../models/restaurantModel.js'

export const createRestaurant = async(req, res) =>{
    try {
        const address = new address({
            city: req.address.city,
            country: req.address.country,
            name: req.address.name,
            postalCode: req.address.postalcode,
            state:req.address.state,
            street:req.address.street
        })  

        const savedAddress = await address.save();

        const restaurant = new restaurant({
            address:savedAddress,
            contactInformation: req.contactInformation,
            cuisineType:        req.cuisineType,
            description:        req.description,
            images:             req.images,
            name:               req.name,
            openingHours:       req.openinghours,
            registraionDate:    req.registraionDate,
            owner:              req.owner
        })
        const savedRestaurant = await restaurant.save();
        return savedRestaurant;

    } catch (error) {
        throw new Error(error.message);
    }

}

export const findRestaurantById = async(restaurantId) =>{

    try {
        const restaurant = await restaurantModel.findById(restaurantId);
    if(!restaurant) throw new Error(error.message);
    return restaurant;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteRestaurant = async(restaurantId) =>{
   try {
    this.findRestaurantById(restaurantId);
   const restaurant = await restaurantModel.deleteById(restaurantId);
   } catch (error) {
    throw new Error (error.message); 
   }
}

export const getAllRestaurant = async() =>{

    try {
        return restaurant = await  restaurantModel.findAll();   
    } catch (error) {
        throw new Error (error.message);
    }

} 

export const getRestaurantByUserId = async (UserId) => {
    try {
        const restaurant = await findOne({owner:UserId})
        .populate("owner")
        .populate("address");

        if(!restaurant){
            throw new Error(error.message)
        }
        return restaurant;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const searchRestaurant = async (keyword) =>{
    try {
        const restaurant =  await restaurantModel.find({
            $or: [
                {
                    name: {$regex:keyword, $option: "i" },
                    description: {$regex:keyword, $option: "i"},
                    cuisineType: {$regex:keyword, $option: "i"},
                    address: {$regex:keyword, $option: "i"},        
                }
            ]
        });
        return restaurant;

    } catch (error) {
        throw new Error(error.message)
    }
}

export const addTofavorite = async(restaurantId,user) =>{
    try {
        const restaurant = this.findRestaurantByIdById(restaurantId);

        const dto = {
            id:restaurant._id,
            title:restaurant.name,
            images:restaurant.images,
            description:restaurant.description
        }
        const favorite = user.favorite || [];
        const index = favorite.findIndex(favorite._id === restaurant._id);

        if(index !== 1){
            favorite.splice(index,1);
        }
        else{
            favorite.push(dto);
        }

        user.favorite = favorite;
        await user.save();
        return dto;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const udpdateRestaurantStatus = async(restaurantId) =>{
    try {
        const restaurant = await restaurantModel.findById(restaurantId)
    .populate("owner")
    .populate("address");

    if(!restaurant){
        throw new Error("restaurant not found");
    }

    restaurant.open =! restaurant.open;
    await restaurant.save();
    return restaurant;
    } catch (error) {
        throw new Error(error.message)
    }
}