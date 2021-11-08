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
export class HttpException <T>{
  status: HttpStatusCode
  trustedException: boolean
  constructor(message: T, status: HttpStatusCode){
    this.status = status
    this.trustedException = true
    this.message = this.defaultMessage(status, message)
  }

  defaultMessage (statusCode: HttpStatusCode, message: any) { 
    if (typeof(message) === 'undefined') {
      switch (statusCode) {
        case HttpStatusCode.BadRequest:
          return BAD_REQUEST
        case HttpStatusCode.InternalServer:
          return INTERNAL_SERVER_ERROR
        case HttpStatusCode.UnAuthorized:
          return UN_AUTHORIZED
        case HttpStatusCode.NotFound:
          return NOT_FOUND
        case HttpStatusCode.Forbidden:
          return FORBIDDEN
      } 
    } else {
      return message
    }
  }
  message: any
}
/**
 * @example
 * throw new NotFoundException()
 */
export class NotFoundException<T> extends HttpException<T>{
  constructor(message?:T) {
    super(message, HttpStatusCode.NotFound)
  }
}
/**
 * @example
 * throw new BadRequestException()
 */
export class BadRequestException<T> extends HttpException<T>{
  constructor(message?: T) {
    super(message, HttpStatusCode.BadRequest)
  }
}
/**
 * @example
 * throw new ForbiddenException()
 */
export class ForbiddenException<T> extends HttpException<T>{
  constructor (message?: T) {
    super(message, HttpStatusCode.Forbidden)
  }
}
/**
 * @example
 * throw new UnAuthorizedException()
 */
export class UnAuthorizedException<T> extends HttpException<T> {
  constructor (message?: T) {
    super(message, HttpStatusCode.UnAuthorized)
  }
}
/**
 * @example
 * throw new InternalServerErrorException()
 */
export class InternalServerErrorException<T> extends HttpException<T> {
  constructor (message?: T) {
    super(message, HttpStatusCode.InternalServer)
  }
}
export class Redirect extends HttpException<string> {
  destination: string
  statusCode: number = HttpStatusCode.RedirectTemporary
  redirectionResult: boolean = true
  constructor(destination: string, permanent: boolean = false) {
    super('redirect', permanent ? HttpStatusCode.RedirectMovedPermanent : HttpStatusCode.RedirectTemporary)
    this.destination = destination
    this.statusCode = permanent ? HttpStatusCode.RedirectMovedPermanent : HttpStatusCode.RedirectTemporary
  }
}