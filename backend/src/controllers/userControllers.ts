import { Request, Response, NextFunction } from "express";
import { UserModel, UserIntf } from "../models/userModel.js";
import { DatabaseError, ValidationError } from "../types/errorTypes.js";

export const postCreateUserController = async (req: Request, res: Response, next: NextFunction) => {
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

export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserIntf | null = await UserModel.findOne();
        if (!user) {
            throw new DatabaseError("Could not find user in database", 404);
        }
        res.status(200).send({ user });
    } catch (error) {
        next(error);
    }
};
