import { HttpStatusCode } from '../types';
/**
 * @example
 * throw new HttpException("your error message", your_status_number)
 */
export declare class HttpException extends Error {
    status: HttpStatusCode;
    trustedException: boolean;
    constructor(message: string, status: HttpStatusCode);
}
/**
 * @example
 * throw new NotFoundException()
 */
export declare class NotFoundException extends HttpException {
    notFound: boolean;
    constructor(message?: string);
}
/**
 * @example
 * throw new BadRequestException()
 */
export declare class BadRequestException extends HttpException {
    constructor(message?: string);
}
/**
 * @example
 * throw new ForbiddenException()
 */
export declare class ForbiddenException extends HttpException {
    constructor(message?: string);
}
/**
 * @example
 * throw new UnAuthorizedException()
 */
export declare class UnAuthorizedException extends HttpException {
    constructor(message?: string);
}
/**
 * @example
 * throw new InternalServerErrorException()
 */
export declare class InternalServerErrorException extends HttpException {
    constructor(message?: string);
}
export declare class Redirect extends HttpException {
    destination: string;
    statusCode: number;
    redirectionResult: boolean;
    constructor(destination: string, permanent?: boolean);
}
