export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  OPTIONS = 'options',
  DELETE = 'delete'
}

export enum HttpStatusCode {
  BadRequest = 400,
  UnAuthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServer = 500
}
  
export interface RouteDefinition {
  requestMethod: HttpMethods,
  path: string,
  methodName: string
}

export interface MethodDefinition {
  path: string
  method: HttpMethods
}
export interface InjectPerRequest {
  instance: Function
  methodName: string
  req: any
  res: any,
  next: any
}

export interface ControllerOptions {
  prefix?: string
}

export interface AppModule {
  view?: any
  controller: Function
  exact?: boolean
  path: string
  name: string,
  reducer: Function
  outputCache?: number
  statusCode?: HttpStatusCode
}

export interface BaseModule {
  providers: Function[]
  configureStore: Function
}
export interface CreateAppOptions {
  bootstrap: object
}