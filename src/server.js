import connectDb from './config/db.js';
import app from './index.js'
import colors from 'colors'


const PORT = process.env.PORT

connectDb();

app.listen(PORT,()=>{
    console.log(`Server is Running on ${process.env.PORT}`.bgGreen);
})