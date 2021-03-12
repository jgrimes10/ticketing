import { BadRequestError } from '../errors/bad-request-error';

// function that can be used with a null coalescing operator to
// throw an error if it's null
// used to satisfy typescript unwrapping of variables

/* example of usage:
----------------------
const x = process.env.some_value ?? throwExpression('some_value must be defined'),
----------------------
 */

export function throwExpression(errorMessage: string): never {
    throw new BadRequestError(errorMessage);
}
