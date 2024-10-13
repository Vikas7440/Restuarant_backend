import {createUser,getUserByEmail } from '../services/userService.js'
import {generateToken} from '../config/jwtProvider.js'
import bcrypt from 'bcrypt'

export const register = async(req,res)=>{

    try {
        const user = await createUser(req.body);
        const jwt = generateToken(user._id);
        // await cartService.createCart(user);
    return res.status(201).send({jwt,message:"Registration Successful",user});
    } catch (error) {
      return res.status(501).send({error:error.message})  
    }
}

export const login = async (req, res) =>{
    
    try {
        const {email,password} = req.body;
        const user  = await getUserByEmail(email);

        const validatePassword = await bcrypt.compare(password,user.password);
        if(!validatePassword){
             return res.status(401).send({error:'Invalid Credentials'});  
        }
       
        const jwt = generateToken(user._id)
        return res.status(201).send({jwt,message:"Login Successful"});
   
    } catch (error) {
            console.log("Error in controller")
            return res.status(501).send({error:error.message})  
    }
}