export class DatabaseError extends Error {
    statusCode: number;
    name: string;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "DataError";
    }
}

export class ValidationError extends Error {
    statusCode: number;
    name: string;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ValidationError";
    }
}
