import { Request, Response, NextFunction } from "express";
import { ListingModel, ListingIntf } from "../models/listingModel.js";
import { DatabaseError, ValidationError } from "../types/errorTypes.js";
import { ArrUserDocumentId } from "../types/userDocumentTypes.js";

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
        const listing: ListingIntf | null = await ListingModel.findById(listingIdfromParams);
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
        const { user } = req.body;

        // extract array of UserIds from Listing.likes object
        const arrayOfUserIdsInLikes: ArrUserDocumentId = listingObject.likes;

        // if statement to check whether this userId is already in likes array and if so, remove it from there:
        if (arrayOfUserIdsInLikes.includes(user)) {
            //get index of UserId to remove:
            const indexOfUserIdToRemove: number = arrayOfUserIdsInLikes.indexOf(user);

            // remove the userId from the likes array based on its index:
            arrayOfUserIdsInLikes.splice(indexOfUserIdToRemove, 1);

            // save the changes to our db:
            await listingObject.save();

            res.status(200).send({
                message: `User removed from likes on the follwoing listing ID ${listingIdToUpdate}`,
            });
        } else {
            // oherwise, if UserId is not in the likes array, we want to add it there:
            listingObject.likes.push(user);

            // save the changes to the db:
            await listingObject.save();

            const listings: ListingIntf[] | null = await ListingModel.find();

            res.status(200).send({
                message: `UserId added to likes in this listing id ${listingIdToUpdate} and here is the listing: ${listingObject}}`,
                listings,
            });
        }

        // add this userId to this listing.likes array
    } catch (error) {
        next(error);
    }
};
