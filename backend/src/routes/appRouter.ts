import { Request, Response, Router } from "express";
import { postCreateUserController, getUserController} from "../controllers/userControllers.js";

const appRouter: Router = Router();

appRouter.post("/newuser", postCreateUserController)
appRouter.get("/me", getUserController);
appRouter.get("/listings");
appRouter.put("/listings/like/:listingId");

export default appRouter;
