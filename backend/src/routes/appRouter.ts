import { Request, Response, Router } from "express";

const appRouter: Router = Router();

appRouter.get("/me");
appRouter.get("/listings");
appRouter.put("/listings/like/:listingId");

export default appRouter;
