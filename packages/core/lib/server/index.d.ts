import './polyfill';
import { Application } from 'express';
import { CreateAppOptions } from '../types';
export declare function createServer(options: CreateAppOptions): Promise<Application>;
