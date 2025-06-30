import mongoose from "mongoose";

const participateModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }
}, {
    timestamps: true
})
export const ParticipatesList = mongoose.model("ParticipatesList", participateModel)