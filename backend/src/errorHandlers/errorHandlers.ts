import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { DatabaseError, ValidationError } from "../types/errorTypes.js";

const globalErrorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof DatabaseError || err instanceof ValidationError) {
        res.status(err.statusCode).json({ error: err.message });
    }

    res.status(500).json({ error: err.message });
};

export { globalErrorHandler };
