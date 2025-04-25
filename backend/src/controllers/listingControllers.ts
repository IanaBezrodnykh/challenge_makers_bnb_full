import { Request, Response, NextFunction } from "express";
import { ListingModel, ListingIntf } from "../models/listingModel.js";
import { DatabaseError, ValidationError } from "../types/errorTypes.js";
import mongoose from "mongoose";

export const getAllListingsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listings: ListingIntf[] | null = await ListingModel.find();
        if (!listings) {
            throw new DatabaseError("There are no listings available", 404);
        }
        res.status(200).send({ listings });
    } catch (error) {
        next(error);
    }
};

export const getListingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listingIdfromParams: string = req.params.listingId;
        const listing: ListingIntf | null = await ListingModel.findById(listingIdfromParams).populate([
            "likes",
            "owner",
        ]);
        if (!listing) {
            throw new DatabaseError("There is no listing with this id", 404);
        }
        res.status(200).send({ listing });
    } catch (error) {
        next(error);
    }
};

export const putAddRemoveUserIdInLikeArray = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // extract listing from params "/listings/like/:listingId" = req.params.listingId:
        const listingIdToUpdate: string = req.params.listingId;

        // get the full listing object:
        const listingObject: ListingIntf | null = await ListingModel.findById(listingIdToUpdate);

        // our custom error if there is no listing with this ID:
        if (!listingObject) {
            throw new DatabaseError("Sorry, no listing with this ID", 404);
        }

        // extract userId from body of the PUT request:
        const { user } = req.body; // will return a string

        // convert above user id that is passed as a string into ObjectId type:
        const userIdAsObject = new mongoose.Types.ObjectId(user);

        // extract array of UserIds from Listing.likes object
        const arrayOfUserIdsInLikes: mongoose.Types.ObjectId[] = listingObject.likes;

        // capture if user already liked the listing before modifying it:
        let isUserAlreadyLiked: boolean = arrayOfUserIdsInLikes.includes(userIdAsObject);

        // if statement to check whether this userId is already in likes array and if so, remove it from there:
        if (isUserAlreadyLiked) {
            //get index of UserId to remove:
            const indexOfUserIdToRemove: number = arrayOfUserIdsInLikes.indexOf(userIdAsObject);

            // remove the userId from the likes array based on its index:
            arrayOfUserIdsInLikes.splice(indexOfUserIdToRemove, 1);
        } else {
            // oherwise, if UserId is not in the likes array, we want to add it there:
            listingObject.likes.push(userIdAsObject);
        }

        // save the changes to our db:
        await listingObject.save();

        // get updated listings array:
        const listings: ListingIntf[] | null = await ListingModel.find();

        //send the response:
        res.status(200).send({
            message: `UserId ${userIdAsObject} ${
                isUserAlreadyLiked ? "removed from" : "added to"
            } likes for listing ID ${listingIdToUpdate}`,
            listings,
        });
    } catch (error) {
        next(error);
    }
};
