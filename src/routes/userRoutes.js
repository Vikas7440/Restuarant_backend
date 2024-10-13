import express from 'express';
import getUserProfileHandler from '../controllers/userController.js';
import authenticate from '../middleWare/authenticate.js';

const router = express.Router();

router.get('/profile',authenticate, getUserProfileHandler);

export default router;
