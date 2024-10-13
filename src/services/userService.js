import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import { getUserIdFromToken } from '../config/jwtProvider.js';;

export const  createUser = async(userData)=>{
    try {
        const {name, email, password,role} = userData; 
        const existingUser = await User.findOne({email:email})
        if(existingUser){
            throw new Error('Email already exists');
        }
        
        const hashPassword = await bcrypt.hash(password,1);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role  
        })
         return user;
    } catch (error) {
        console.log("user not created")
        throw new Error(error.message)
    }
}

export const getUserByEmail = async(email) => {
    try {
        
        const user = await User.findOne({email:email});
        if (!user) {
            throw new Error('No user found with that email');
        };

        return user;
    } catch (error) {
    throw new Error(error.message);    
    }
}

export const findUserById = async (userId)=>{
  try {
      const existingUser = await User.findById(userId).populate("addresses");

      if(!existingUser){
          throw new Error('No user found with that id ', userId);
        }
        return existingUser;
    }
  catch(error){
    throw new Error(error.message)
  }
}

export const findUserProfileByJWT = async(jwt)=>{
    try {
        const userId = getUserIdFromToken(jwt);
        const user = await findUserById(userId);

        return user;        
    } catch (error) {
        throw new Error(error.message);
    }
}

export const findAllUser  = async()=>{

    try {
        const user = await User.find();
        return user; 
    } catch (error) {
        throw new Error(error.message);
    }
}