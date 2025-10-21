import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema({
    filename: { type: String, required: true },
    originalname: { type: String },
    hash: { type: String, required: true, unique: true },
    size: { type: Number },
    mimetype: { type: String },
    path: { type: String },
    uploadDate: { type: Date, default: Date.now },
    collaborators: [{ type: String }],
    shareToken: { type: String, default: null },
},
    { timestamps: true }
)

export default mongoose.model("Document", documentSchema)