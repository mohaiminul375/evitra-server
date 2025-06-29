import express from "express";
import cors from "cors";
const app = express();
// middleware
app.use(cors());
app.use(express.json());

import userRouter from './routers/user.router.js';

// routers
app.use('/users', userRouter)


export { app }