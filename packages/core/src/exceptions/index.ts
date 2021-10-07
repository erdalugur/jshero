import { HttpStatusCode } from '../types'
const 
NOT_FOUND = 'Not Found', 
BAD_REQUEST = 'BadRequest',
FORBIDDEN = 'Forbidden',
UN_AUTHORIZED = 'UnAuthorized',
INTERNAL_SERVER_ERROR = 'Internal Server Error';
/**
 * @example
 * throw new HttpException("your error message", your_status_number)
 */
export class HttpException extends Error {
  status: HttpStatusCode
  trustedException: boolean
  constructor(message: string, status: HttpStatusCode){
    super(message)
    this.status = status
    this.trustedException = true
  }
}
/**
 * @example
 * throw new NotFoundException()
 */
export class NotFoundException extends HttpException {
  constructor(message: string = NOT_FOUND) {
    super(message, HttpStatusCode.NotFound)
  }
}
/**
 * @example
 * throw new BadRequestException()
 */
export class BadRequestException extends HttpException {
  constructor(message: string = BAD_REQUEST) {
    super(message, HttpStatusCode.BadRequest)
  }
}
/**
 * @example
 * throw new ForbiddenException()
 */
export class ForbiddenException extends HttpException {
  constructor (message: string = FORBIDDEN) {
    super(message, HttpStatusCode.Forbidden)
  }
}
/**
 * @example
 * throw new UnAuthorizedException()
 */
export class UnAuthorizedException extends HttpException {
  constructor (message: string = UN_AUTHORIZED) {
    super(message, HttpStatusCode.UnAuthorized)
  }
}
/**
 * @example
 * throw new InternalServerErrorException()
 */
export class InternalServerErrorException extends HttpException {
  constructor (message: string = INTERNAL_SERVER_ERROR) {
    super(message, HttpStatusCode.InternalServer)
  }
}

