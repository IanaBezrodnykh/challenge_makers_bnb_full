import mongoose from "mongoose";
export interface ReqUserBodyParams {
    username: string;
    bio: string;
    mostRecentStay?: mongoose.Types.ObjectId;
    profilePic: string;
}
