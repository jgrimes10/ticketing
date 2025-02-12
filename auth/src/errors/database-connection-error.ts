import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor() {
        super('Error connecting to db');

        // only because we are extending a built-in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{ message: this.reason }];
    }
}
