import PropertyTile from "./PropertyTile";
import { useState } from "react";
import { getLoggedInUserServiceFunc } from "../services/userServices";
import { fetchListingById } from "../services/listingsServices";
import { UserIntf } from "../types/UserTypes";
import { useEffect } from "react";
import { RecentStayIntf } from "../types/listingDocumentTypes";
import { DatabaseError } from "../types/errorTypes";

const Profile = () => {
    const [user, setUser] = useState<UserIntf | null>(null);
    const [recentStay, setRecentStay] = useState<RecentStayIntf | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getLoggedInUserServiceFunc();
                if (!userData) {
                    throw new DatabaseError("No User found", 404);
                }
                setUser(userData);

                const listingData = await fetchListingById(userData.mostRecentStay);
                if (!listingData) {
                    throw new DatabaseError("No most recent stay found for this user", 404);
                }
                setRecentStay(listingData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <div id="profile">
            <img id="profilePic" src={user.profilePic} alt={`${user.username}'s profile picture`}></img>
            <h2>{user.username}</h2>
            <p>{user.bio}</p>
            <h2>My most recent stay:</h2>
            {recentStay ? (
                <PropertyTile img={recentStay.img} name={recentStay.name} id={recentStay.id} />
            ) : (
                "No recent stay found"
            )}
        </div>
    );
};

export default Profile;
