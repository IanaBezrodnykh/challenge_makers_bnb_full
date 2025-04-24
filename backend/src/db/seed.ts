import { UserModel } from "../models/userModel.js";
import { ListingModel } from "../models/listingModel.js";
import connectToDatabase from "./dbConnection.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const seedDatabase = async (): Promise<void> => {
    //Create a couple of users in the database
    await connectToDatabase();
    await UserModel.collection.drop();
    await ListingModel.collection.drop();

    const holidayMaker = await UserModel.create({
        username: "holidayMaker",
        bio: "I am a respectful guest who loves to go on holidays!",
        profilePic:
            "https://i.ytimg.com/vi/Q36THRWXRDY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAWDwEwXNEG6udMXXxNkjBCi4DRZg",
    });

    await holidayMaker.save();

    const serialVacationer = await UserModel.create({
        username: "serialVacationer",
        bio: "I live for the beach",
        profilePic: "https://lionsafari.com/wp-content/uploads/2022/03/SCARLET-2-scaled.jpg",
    });

    await serialVacationer.save();

    //Create some listings
    const beachHouse = await ListingModel.create({
        img: "https://media.vrbo.com/lodging/28000000/27320000/27314000/27313935/e7c3076b.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
        name: "Beach House",
        owner: holidayMaker,
        likes: [],
    });

    await beachHouse.save();

    const tropicalBeachHouse = await ListingModel.create({
        img: "https://images.stockcake.com/public/3/c/4/3c4fdcfb-31ec-4fa8-b0fe-a01b858e333d_large/tropical-beach-house-stockcake.jpg",
        name: "Tropical Beach House",
        owner: serialVacationer,
        likes: [],
    });

    await tropicalBeachHouse.save();

    const barcelonaFlat = await ListingModel.create({
        img: "https://www.top-barcelona-apartments.com/wp-content/uploads/2023/07/IMG_5354-scaled.jpg",
        name: "Barcelona Flat",
        owner: serialVacationer,
        likes: [],
    });

    await barcelonaFlat.save();

    //Add the listings to the mostRecentStay for the users
    holidayMaker.mostRecentStay = barcelonaFlat.id;
    serialVacationer.mostRecentStay = beachHouse.id;

    await holidayMaker.save();
    await serialVacationer.save();

    //Disconnect from the database
    mongoose.disconnect();
};

await seedDatabase();
