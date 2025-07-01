import { Router } from "express";
import { Event } from "../models/event.model.js";
import { ParticipatesList } from "../models/participantList.model.js";
import mongoose from "mongoose";
const router = Router();


// all list
router.get('/all-list', async (req, res) => {
    try {
        const result = await ParticipatesList.find()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Failed to get events: ${error.message}` });
    }

})

// attendance list based on event id
router.get('/attendance/:id', async (req, res) => {
    try {
        const title = await Event.findOne({ _id: req.params.id })
        const result = await ParticipatesList.find({ event_id: req.params.id })
        res.status(200).json({ title: title.event_title, attendance:result });
    } catch (error) {
        res.status(500).json({ message: `Failed to get attendance: ${error.message}` });
    }
})



// get join data for user
router.get('/all-list/:email', async (req, res) => {
    try {
        const result = await ParticipatesList.find({ email: req.params.email })
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Failed to get events: ${error.message}` });
    }

})
// Join event
router.post('/join-event', async (req, res) => {
    const session = await mongoose.startSession(); //session for multiple operation
    session.startTransaction();
    console.log(req.body)
    try {
        const { email, name, event_id } = req.body;

        // get the event by id
        const currentEvent = await Event.findOne({ _id: event_id }).session(session);
        if (!currentEvent) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Event not found" });
        }

        // create a new collection participates list
        const participant = new ParticipatesList({ email, name, event_id });
        await participant.save({ session });

        // incourage attendee count and save to db
        currentEvent.attendeeCount = (currentEvent.attendeeCount || 0) + 1;
        await currentEvent.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ success: true, message: "Successfully joined the event" });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Failed to join event", error: error.message });
    }
});

export default router;