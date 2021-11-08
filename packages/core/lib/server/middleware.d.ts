import { HttpNextFunction, HttpRequest, HttpResponse } from '../types';
export declare function errorLogger(err: any, req: HttpRequest, res: HttpResponse, next: HttpNextFunction): Promise<void>;
export declare function sendError(req: HttpRequest, res: HttpResponse): void;
export declare function requestContextMiddleware(req: HttpRequest, res: HttpResponse, next: HttpNextFunction): void;
