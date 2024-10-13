import { getUserIdFromToken } from '../config/jwtProvider.js'
import { findUserById } from '../services/userService.js'


const authenticate = async (req,res,next) =>{
    try {

        const token = req.headers.authorization?.split(' ')[1]

        if(!token){
            return res.status(401).json({message:"No token Provided"})
        }
        const userId = getUserIdFromToken(token);
        const user =await findUserById(userId);
        req.user = user;
        next();
    
    } catch (error) {
        return res.send({error:error.message});

    }
}

export default authenticate;