import Events from '../models/eventModel.js';
import Restaurant from '../models/restaurantModel.js';

export const createEvent = async (event, restaurantId) =>{
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if(!restaurant){
            throw new Error ('Restaurant not found with this ID ');
        }

        const createEvent = new Events ({
            restaurant: restaurantId,
            image: event.image,
            startedAt: event.startedAt,
            endsAt: event.endsAt,
            location: event.location,
            name:event.name
        });
        await createEvent.save();
        return createEvent;
    } catch (error) {
        throw new Error (`Failed to create Event ${error.message}`);
    }
}

export const findAllEvents = async ()=> {
    try {
        const events = await Events.find();
        return events;
    } catch (error) {
        throw new Error (`Failed to find all Event ${error.message}`);
    }

}

export const findrestaurantEvent = async (restaurantId)=>{
    try {
        const events = await Events.find({ restaurant: restaurantId });
        return events;
    } catch (error) {
        throw new Error (`Failed to find events for restaurant Id ${restaurantId}`);
    }
}

export const deleteEvent = async (eventId)=>{
    try {
        await Events.findByIdAndDelete(eventId);
    } catch (error) {
        throw new Error (`Failed to delete Event ${error.message}`);
    }
}

export const findByIds = async (eventId)=>{
    try {
        const event = await Events.findById(eventId);
        if(!event){
            throw new Error (`Event not found ${eventId}`); 
        }
        return event;
    } catch (error) {
        throw new Error (`Event not found with Id ${error.message}`); 
    }
}