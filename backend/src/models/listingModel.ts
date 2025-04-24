import mongoose, { Document } from "mongoose";
import { UserDocumentId, ArrUserDocumentId } from "../types/userDocumentTypes.js";

interface ListingIntf extends Document {
    img: string;
    name: string;
    owner: UserDocumentId; // add UserDocumentId type
    likes: ArrUserDocumentId; // add ArrayofUserDocumentsIds
}

const ListingSchema = new mongoose.Schema<ListingIntf>({
    img: { type: String, required: true },
    name: { type: String, required: true },
    owner: { type: String, required: true },
    likes: { type: [String], required: true },
});

const ListingModel = mongoose.model<ListingIntf>("Listing", ListingSchema);

export { ListingModel, ListingIntf };
