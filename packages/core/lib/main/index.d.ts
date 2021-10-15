/// <reference types="react" />
import { AnyAction, Store } from 'redux';
import { AppModule } from '../types';
export declare function createApp(store: Store<any, AnyAction>, modules: AppModule[]): JSX.Element;
