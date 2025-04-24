import { Request, Response, NextFunction } from "express";
import { ExampleParams } from "../types/paramsTypes.js";
import { ExampleModel, Example } from "../models/example.js";
import { OneDocumentResponse } from "../types/responsesTypes.js";
import { DatabaseError, ValidationError } from "../types/errorTypes.js";
import { BodyParams } from "../types/bodyTypes.js";

const getExampleByIdController = async (
    req: Request<ExampleParams, {}, {}, {}>,
    res: Response<OneDocumentResponse<Example>>,
    next: NextFunction
) => {
    try {
        const params: number = Number(req.params.id);

        const exampleDoc: Example | null = await ExampleModel.findOne({
            secondProperty: params,
        });

        if (!exampleDoc) {
            throw new DatabaseError("Could not find the correct document", 404);
        }

        res.status(200).json({ document: exampleDoc });
    } catch (error) {
        next(error);
    }
};

const postCreateExample = async (
    req: Request<{}, {}, BodyParams, {}>,
    res: Response<{ examplesList: Example[]; msg: string }>,
    next: NextFunction
) => {
    try {
        const { firstProperty, secondProperty, thirdProperty } = req.body;

        if (!firstProperty || !secondProperty) {
            throw new ValidationError(
                "Missing property on the request body",
                400
            );
        }
        // .create() also saves the document so no need to "newDocument.save();"
        const newDocument: Example | null = await ExampleModel.create({
            firstProperty,
            secondProperty,
            thirdProperty,
        });

        const exampleDocumentsList: Example[] | null =
            await ExampleModel.find();
        console.log(exampleDocumentsList);

        res.status(201).send({
            msg: `document ${newDocument._id} created successfully`,
            examplesList: exampleDocumentsList,
        });
    } catch (error) {
        next(error);
    }
};

export { getExampleByIdController, postCreateExample };
