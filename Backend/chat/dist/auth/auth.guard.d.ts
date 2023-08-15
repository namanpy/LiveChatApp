import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
    getToken(request: Request): any;
}
export declare class WsAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
