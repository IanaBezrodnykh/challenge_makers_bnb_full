import mongoose, { Document } from "mongoose";
import { ListingIntf } from "./listingModel.js";

interface UserIntf extends Document {
    username: string;
    bio: string;
    mostRecentStay: mongoose.Types.ObjectId;
    profilePic: string;
}
const UserSchema = new mongoose.Schema<UserIntf>({
    username: { type: String, required: true },
    bio: { type: String, required: false },
    mostRecentStay: {
        //instead of creating a new interface/type,
        // we should use mongoose ObjectId type
        // that will also link to Listings Model by using ref:
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: false,
    },
    profilePic: { type: String, required: true },
});

// MongoDB takes the name from here and populates the collection with this name + s:
const UserModel = mongoose.model<UserIntf>("User", UserSchema);

export { UserModel, UserIntf };
