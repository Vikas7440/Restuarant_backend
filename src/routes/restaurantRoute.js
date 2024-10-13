import express from 'express';
import {findRestaurantById, findRestaurantNyName,getAllRestaurant} from '../controllers/restaurantController.js';


const router = express.Router();

router.get('/search',findRestaurantNyName);
// router.get('/',getAllRestaurant);
// router.get('/:id',findRestaurantById)

export default router;
