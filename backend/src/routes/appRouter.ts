import { Request, Response, Router } from "express";
import { postCreateUser } from "../controllers/userControllers.js";

const appRouter: Router = Router();

appRouter.post("/newuser", postCreateUser)
appRouter.get("/me");
appRouter.get("/listings");
appRouter.put("/listings/like/:listingId");

export default appRouter;
