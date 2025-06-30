import { Router } from "express";
const router = Router();
import { Event } from "../models/event.model.js";
import moment from "moment";

// get all events


router.get('/all-events', async (req, res) => {
    try {
        const { search, sort, todayDate } = req.query;
        const searchRegex = search ? new RegExp(search, "i") : null;

        let query = {};
        // Search filter
        if (searchRegex) {
            query.event_title = searchRegex;
        }
        // today date
        if (todayDate) {
            query.event_Date = {
                $gte: moment().startOf("day").toISOString(),
                $lte: moment().endOf("day").toISOString(),
            }
        }
        // sort by date range
        if (sort) {
            if (sort === "current_week") {
                query.event_Date = {
                    $gte: moment().startOf("week").toISOString(), //gte:greater than or equal
                    $lte: moment().endOf("week").toISOString(), //lte: less than or equal
                };
            } else if (sort === "last_week") {
                query.event_Date = {
                    $gte: moment().subtract(1, "weeks").startOf("week").toISOString(),
                    $lte: moment().subtract(1, "weeks").endOf("week").toISOString(),
                };
            } else if (sort === "current_month") {
                query.event_Date = {
                    $gte: moment().startOf("month").toISOString(),
                    $lte: moment().endOf("month").toISOString(),
                };
            } else if (sort === "last_month") {
                query.event_Date = {
                    $gte: moment().subtract(1, "months").startOf("month").toISOString(),
                    $lte: moment().subtract(1, "months").endOf("month").toISOString(),
                };
            }
        }
        const result = await Event.find(query).sort({ event_Date: -1 });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Failed to get events: ${error.message}` });
    }
});

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
