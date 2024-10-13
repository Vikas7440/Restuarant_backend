import JWT from 'jsonwebtoken'

export const JWT_SECRET = process.env.JWT_SECRET

export const generateToken = (userId) =>{
 
   return JWT.sign({ userId:userId },JWT_SECRET, { expiresIn: '48h' });
}

export const getUserIdFromToken = (token) => {
    const decode = JWT.verify(token,JWT_SECRET)
    return decode.userId;
}   