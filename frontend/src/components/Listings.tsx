import PropertyTile from "./PropertyTile";
import { useState, useEffect } from "react";
import { fetchAllListings } from "../services/listingsServices";
import { DatabaseError } from "../types/errorTypes";
import { ListingIntf } from "./Profile";

const Listings = () => {
    const [listings, setListings] = useState<Array<ListingIntf>>();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const listingData: ListingIntf[] = await fetchAllListings();
                if (!listingData) {
                    throw new DatabaseError("No Listings found", 404);
                }
                setListings(listingData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchListings();
    }, []);

    return (
        <div id="listings">
            {listings?.map((listing) => {
                return <PropertyTile key={listing._id} img={listing.img} name={listing.name} />;
            })}
        </div>
    );
};

export default Listings;
