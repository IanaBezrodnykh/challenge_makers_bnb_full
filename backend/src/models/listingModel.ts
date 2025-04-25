import mongoose, { Document } from "mongoose";

interface ListingIntf extends Document {
    img: string;
    name: string;
    owner: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];
}

const ListingSchema = new mongoose.Schema<ListingIntf>({
    img: { type: String, required: true },
    name: { type: String, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
});

const ListingModel = mongoose.model<ListingIntf>("Listing", ListingSchema);

export { ListingModel, ListingIntf };
