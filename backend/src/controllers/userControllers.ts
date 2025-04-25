import { Request, Response, NextFunction } from "express";
import { UserModel, UserIntf } from "../models/userModel.js";
import { DatabaseError, ValidationError } from "../types/errorTypes.js";
import { ReqUserBodyParams } from "../types/bodyTypes.js";
import { ReqUserParams } from "../types/paramsTypes.js";
import { OneDocumentResponse } from "../types/responsesTypes.js";

export const postCreateUserController = async (
    req: Request<{}, {}, ReqUserBodyParams, {}>,
    res: Response<{ msg: string }>,
    next: NextFunction
) => {
    try {
        const { username, bio, mostRecentStay, profilePic } = req.body;

        if (!username || !profilePic) {
            throw new ValidationError("Missing property on the request body", 400);
        }
        const newDocument: UserIntf | null = await UserModel.create({
            username,
            bio,
            mostRecentStay,
            profilePic,
        });
        res.status(201).send({
            msg: `user with the following ID ${newDocument._id} created successfully`,
        });
    } catch (error) {
        next(error);
    }
};

// can use .populate: user.populate(mostRecentStay) = object of the listing (finds id in collection)
export const getUserController = async (
    req: Request<ReqUserParams, {}, {}, {}>,
    res: Response<OneDocumentResponse<UserIntf>>,
    next: NextFunction
) => {
    try {
        const envUserId = process.env.USER_ID;
        if (!envUserId) {
            throw new ValidationError("USER_ID environment variable is not set", 400);
        }
        const user: UserIntf | null = await UserModel.findOne({ _id: envUserId }).populate("mostRecentStay");
        if (!user) {
            throw new DatabaseError("Could not find user in database", 404);
        }
        // const recentStay: ListingIntf = await user.populate(String(user.mostRecentStay));

        res.status(200).send({ document: user });
    } catch (error) {
        next(error);
    }
};
