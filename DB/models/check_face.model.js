import { Schema, Types, model } from 'mongoose';
const checkFaceSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User", required: true },
    reportMissingPersonId: { type: Types.ObjectId, ref: 'Finder' },
    volunteerId: { type: Types.ObjectId, ref: 'Guset' },
    checkFaceimage: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
});
export const checkFaceModel = model("CheckFace", checkFaceSchema);