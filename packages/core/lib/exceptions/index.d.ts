import { HttpStatusCode } from '../types';
/**
 * @example
 * throw new HttpException("your error message", your_status_number)
 */
export declare class HttpException<T> {
    status: HttpStatusCode;
    trustedException: boolean;
    constructor(message: T, status: HttpStatusCode);
    defaultMessage(statusCode: HttpStatusCode, message: any): any;
    message: any;
}
/**
 * @example
 * throw new NotFoundException()
 */
export declare class NotFoundException<T> extends HttpException<T> {
    constructor(message?: T);
}
/**
 * @example
 * throw new BadRequestException()
 */
export declare class BadRequestException<T> extends HttpException<T> {
    constructor(message?: T);
}
/**
 * @example
 * throw new ForbiddenException()
 */
export declare class ForbiddenException<T> extends HttpException<T> {
    constructor(message?: T);
}
/**
 * @example
 * throw new UnAuthorizedException()
 */
export declare class UnAuthorizedException<T> extends HttpException<T> {
    constructor(message?: T);
}
/**
 * @example
 * throw new InternalServerErrorException()
 */
export declare class InternalServerErrorException<T> extends HttpException<T> {
    constructor(message?: T);
}
export declare class Redirect extends HttpException<string> {
    destination: string;
    statusCode: number;
    redirectionResult: boolean;
    constructor(destination: string, permanent?: boolean);
}
