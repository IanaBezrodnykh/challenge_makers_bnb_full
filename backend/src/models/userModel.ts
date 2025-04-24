import mongoose, { Document } from "mongoose";
import { ListingDocumentId } from "../types/listingDocumentTypes.js";

interface UserIntf extends Document {
    username: string;
    bio: string;
    mostRecentStay: ListingDocumentId;
    profilePic: string;
}

const UserSchema = new mongoose.Schema<UserIntf>({
    username: { type: String, required: true },
    bio: { type: String, required: false },
    mostRecentStay: { type: String, required: false },
    profilePic: { type: String, required: true },
});

const UserModel = mongoose.model<UserIntf>("User", UserSchema);

export { UserModel, UserIntf };
