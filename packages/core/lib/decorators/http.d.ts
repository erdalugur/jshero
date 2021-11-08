import 'reflect-metadata';
export declare function Get(path?: string): MethodDecorator;
export declare function Post(path?: string): MethodDecorator;
export declare function Put(path?: string): MethodDecorator;
export declare function Delete(path?: string): MethodDecorator;
export declare function Options(path?: string): MethodDecorator;
/**
 * @example
 * testMethod(@Body() test: T)
 */
export declare const Body: () => ParameterDecorator;
/**
 * @example
 * testMethod(@Req() req: HttpRequest)
 */
export declare const Req: () => ParameterDecorator;
/**
 * @example
 * testMethod(@Res() res: HttpResponse)
 */
export declare const Res: () => ParameterDecorator;
/**
 * @example
 * testMethod(@Next() next: HttpNextFunction)
 */
export declare const Next: () => ParameterDecorator;
/**
 * @example
 * testMethod(@Param('id') id: string)
 */
export declare function Param(parameter: string): ParameterDecorator;
