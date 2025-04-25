import { ListingIntf } from "../components/Profile";
// assigning variable BACKEND_URL to our backend url that is saved in .env within frontenv under variable VITE_BACKEND_URL:
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// need function to ffetch getListingByID from /listings/:listingId api for Profile.tsx:

export const fetchListingById = async (listingId: string): Promise<ListingIntf> => {
    const response = await fetch(`${BACKEND_URL}/listings/${listingId}`);
    if (response.status !== 200) {
        throw new Error("Unable to fetch this listing!");
    }
    const data = await response.json();
    console.log("This is what data from fetchListingById is: ", data, "This is data.listing:", data.listing);
    return data.listing;
};

// need function to fetch all listings from /listings api for Listings.tsx:

export const fetchAllListings = async (): Promise<ListingIntf[]> => {
    const response = await fetch(`${BACKEND_URL}/listings`);
    if (response.status !== 200) {
        throw new Error("Unable to fetch this listing!");
    }
    const data = await response.json();
    console.log("This is what data from fetchAllListings is: ", data);
    return data.listings;
};
