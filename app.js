import express from "express";
import cors from "cors";
const app = express();
// middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

import userRouter from './routers/user.router.js';
import eventRouter from './routers/event.router.js';

// routers
app.use('/users', userRouter)
app.use('/events', eventRouter)


export { app }