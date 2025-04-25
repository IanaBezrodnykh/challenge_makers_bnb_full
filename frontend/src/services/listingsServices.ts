import { ListingDocumentId, RecentStayIntf } from "../types/listingDocumentTypes";

// assigning variable BACKEND_URL to our backend url that is saved in .env within frontenv under variable VITE_BACKEND_URL:
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// need function to ffetch getListingByID from /listings/:listingId api for Profile.tsx:

export const fetchListingById = async (listingId: ListingDocumentId): Promise<RecentStayIntf> => {
    const response = await fetch(`${BACKEND_URL}/listings/${listingId}`);
    if (response.status !== 200) {
        throw new Error("Unable to fetch this listing!");
    }
    const data = await response.json();
    return data.listing;
};

// need function to fetch all listings from /listings api for Listings.tsx:
