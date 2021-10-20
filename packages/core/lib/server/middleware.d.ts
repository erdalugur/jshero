import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions';
export declare function errorLogger(err: HttpException, req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function sendError(req: Request, res: Response): void;
