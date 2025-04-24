import { Request, Response, Router } from "express";
import {
    getExampleByIdController,
    postCreateExample,
} from "../controllers/example.js";

const exampleRouter: Router = Router();

exampleRouter.get("/:id", getExampleByIdController);
exampleRouter.post("/", postCreateExample);

export default exampleRouter;
