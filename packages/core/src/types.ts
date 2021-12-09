import { Express, NextFunction, Response, Request } from 'express'
import React from 'react'

export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  OPTIONS = 'options',
  DELETE = 'delete'
}

export enum HttpStatusCode {
  RedirectMovedPermanent = 301,
  RedirectTemporary = 302,
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

export type MiddlewareFn = (req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => void
export interface ControllerOptions {
  prefix?: string
  middleware?: Array<MiddlewareFn>
}

export interface AppModule {
  view?: any
  controller: Function
  exact?: boolean
  path: string
  name: string,
  outputCache?: number
}

export interface CombinedAppModule extends AppModule {
  getInitialState: () => any
  cacheKey: string
}

export interface BaseModule {
  providers: Function[]
}
export interface CreateAppOptions {
  bootstrap: object
}

export interface JsHeroServer extends Express {}
export interface HttpRequest extends Request {
  redirect(destination: string, permanent?: boolean): void
  notFound<T>(message?: T): void
  forbidden<T>(message?: T): void
  unAuthorized<T>(message?: T): void
  badRequest<T>(message?: T): void
  internalServerError<T>(message?: T): void
  error: any
}
export interface HttpResponse extends Response { }
export interface HttpNextFunction extends NextFunction { }
export interface InjectMiddlewareType {
  propertyKey: string
  middlewares: Array<MiddlewareFn>
}

export interface HttpContext {
  req: HttpRequest
  res: HttpResponse
  next: HttpNextFunction
}
export interface RootModuleProps {
  initialState: any
  App: React.ElementType<any>
}

export interface RenderResult { html: string, css?: string, initialState: any }
export type InitialRenderProps = {
  App: React.ComponentType<any>,
  render: (App: any) => RenderResult
  initialState: any
}

export class RootModuleType {
  getInitialProps?: (ctx: InitialRenderProps) => Promise<RenderResult>
}