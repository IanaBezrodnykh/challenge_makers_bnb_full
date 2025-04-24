import { Request, Response, Router } from "express";
import {
    postCreateUserController,
    getUserController,
} from "../controllers/userControllers.js";
import {
    getAllListingsController,
    putAddRemoveUserIdInLikeArray,
} from "../controllers/listingControllers.js";

const appRouter: Router = Router();

appRouter.post("/newuser", postCreateUserController);
appRouter.get("/me", getUserController);
appRouter.get("/listings", getAllListingsController);
appRouter.put("/listings/like/:listingId", putAddRemoveUserIdInLikeArray); //should add a userId to the the array of userIds at the likes key on the correct listing document

export default appRouter;
