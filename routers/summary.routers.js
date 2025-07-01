import { Router } from "express";
import { User } from "../models/user.model.js";
import { Event } from "../models/event.model.js";
const router = Router();

// get highlight data
router.get('/highlight', async (req, res) => {
    try {
        const userCount = await User.estimatedDocumentCount();
        const eventCount = await Event.estimatedDocumentCount();
        //    calculate all attendee
        const events = await Event.find({}, { attendeeCount: 1 });
        // reduce 
        const attendeeTotal = events.reduce((total, event) => {
            return total + (event.attendeeCount || 0);
        }, 0);
        res.status(200).json({
            userCount,
            eventCount,
            attendeeCount: attendeeTotal
        });
    } catch (error) {
        console.error("Error in highlight:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
});
// get summary event 3
router.get('/home-event', async (req, res) => {
    const now = new Date().toISOString();
    const result = await Event.find({ event_Date: { $gte: now } }).sort({ event_Date: 1 }).limit(3) //only 3 data
    res.send(result)
})

export default router