import { Router } from "express";
const router = Router();
import { Event } from "../models/event.model.js";


// get all events
router.get('/all-events', async (req, res) => {
    try {
        const result = await Event.find().sort({ event_Date: -1 }); //-1 most recent events appear first
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: `failed to get tasks: ${error}` });
    }
})
// get event by email
router.get('/all-events/:email', async (req, res) => {
    try {
        const email = req.params.email
        const result = await Event.find({ email }).sort({ event_Date: -1 }); //-1 most recent events appear first
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: `failed to get tasks: ${error}` });
    }
})

// create an event
router.post('/create-event', async (req, res) => {
    try {
        const newEvent = new Event(req.body)
        await newEvent.save()
        res.status(200).json({ success: true, message: 'event was created' });
    } catch (error) {
        res.status(500).json({ message: `failed to create event: ${error}` });
    }
})
// Update an event
router.put('/update-event/:id', async (req, res) => {
    try {
        await
            Event.updateOne({ _id: req.params.id }, {
                $set: {
                    ...req.body
                }
            })

        res.status(200).json({ success: true, message: 'Event was updated' });
    } catch (error) {
        res.status(500).json({ message: `failed to update event: ${error}` });
    }

})
// delete an event
router.delete('/:id', async (req, res) => {
    try {
        await Event.deleteOne({ _id: req.params.id })
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: `failed to delete event: ${error}` });
    }
})
export default router;
