import PropertyTile from "./PropertyTile";
import { useState } from "react";
import { getLoggedInUserServiceFunc } from "../services/userServices";
import { useEffect } from "react";
import { DatabaseError } from "../types/errorTypes";

export interface UserIntf {
    username: string;
    bio: string;
    mostRecentStay: ListingIntf;
    profilePic: string;
}

export interface ListingIntf {
    _id: string;
    img: string;
    name: string;
    owner: object;
    likes: string[];
}

const Profile = () => {
    const [user, setUser] = useState<UserIntf | null>(null);
    // const [recentStay, setRecentStay] = useState<RecentStayIntf | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getLoggedInUserServiceFunc();
                if (!userData) {
                    throw new DatabaseError("No User found", 404);
                }
                setUser(userData);
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
            {user.mostRecentStay ? (
                <PropertyTile
                    img={user.mostRecentStay.img}
                    name={user.mostRecentStay.name}
                    id={user.mostRecentStay._id}
                />
            ) : (
                "No recent stay found"
            )}
        </div>
    );
};

export default Profile;
