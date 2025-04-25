import mongoose, { Document } from "mongoose";
import { ListingDocumentId } from "../types/listingDocumentTypes.js";

interface UserIntf extends Document {
    username: string;
    bio: string;
    mostRecentStay: ListingDocumentId;
    profilePic: string;
}

/* Check this out:
const UserSchema = new mongoose.Schema<User>({
    username: String,
    bio: String,
    mostRecentStay: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing' 
    },
    profilePic: String
});*/

const UserSchema = new mongoose.Schema<UserIntf>({
    username: { type: String, required: true },
    bio: { type: String, required: false },
    mostRecentStay: { type: String, required: false },
    profilePic: { type: String, required: true },
});

const UserModel = mongoose.model<UserIntf>("User", UserSchema); // MongoDB takes the name from here and populate the collection with this name + s

export { UserModel, UserIntf };
