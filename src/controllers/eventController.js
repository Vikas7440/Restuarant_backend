import {createEvent, findAllEvents,findrestaurantEvent, deleteEvent} from '../services/eventService.js';


export const createEvents = async (req, res)=>{
    try {
        const { event } = req.body;
        const { restaurantId } = req.params;
        
        const create = await createEvent(event, restaurantId);
        res.status(200).json(create);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({error: "Internal server Error"}); 
        }
    }
}

export const findAllEvent = async (req, res)=>{
    try {
        const events = await findAllEvents();
        res.status(200).json({events: events});    
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({error: "Internal server Error"}); 
        } 
    }
}

export const findRestaurantEvents = async (req, res)=>{
    try {
        const {restaurantId} = req.params;
        const events = await findrestaurantEvent(restaurantId);
        res.status(202).json(events);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({error: "Internal server Error"}); 
        }
    }
}

export const deleteEvants = async (eventId)=>{
    try {
        const { id } = req.params;
        await deleteEvent(id);
        res.status(202).json({message:"Events Deleted ", success: true});
    } catch (error) {
        res.status(500).json({error:"Internal server Error" });
    }
}
