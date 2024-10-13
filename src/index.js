import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import homeRouter from './routes/homeRoutes.js'
import  dotenv  from 'dotenv';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/',homeRouter);
app.use('/auth',authRoute);
app.use('/api/users', userRoute);

export default app