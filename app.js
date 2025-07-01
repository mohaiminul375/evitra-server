import express from "express";
import cors from "cors";
const app = express();
// middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://evitra-client.vercel.app'],
    credentials: true,
}));
app.use(express.json());

import userRouter from './routers/user.router.js';
import eventRouter from './routers/event.router.js';
import ParticipatesList from "./routers/participantList.router.js";
import Summary from "./routers/summary.routers.js"
// routers
app.use('/users', userRouter)
app.use('/events', eventRouter)
app.use('/participants', ParticipatesList)
app.use('/summary', Summary)


export { app }