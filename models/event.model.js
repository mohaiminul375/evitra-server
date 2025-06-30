import mongoose from "mongoose";

const eventModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    event_title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    event_Date: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    attendeeCount: {
        type: Number,
        required: true,
        default: 0,
    },
    contact: {
        type: String,
        required: true,
    },
}, { timestamps: true })
export const Event = mongoose.model("Event", eventModel)