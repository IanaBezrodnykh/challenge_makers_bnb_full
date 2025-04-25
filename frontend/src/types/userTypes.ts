import { ListingDocumentId } from "./listingDocumentTypes";

export interface UserIntf extends Document {
    username: string;
    bio: string;
    mostRecentStay: ListingDocumentId;
    profilePic: string;
}
