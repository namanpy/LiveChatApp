"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsAuthGuard = exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
let AuthGuard = exports.AuthGuard = class AuthGuard {
    async canActivate(context) {
        let request = context.switchToHttp().getRequest();
        let token = this.getToken(request);
        if (!token) {
            throw new common_1.UnauthorizedException('No Token was provided.');
        }
        let jwt = require('jsonwebtoken');
        try {
            let decoded = jwt.verify(token, 'secret_key_here');
            request.token = decoded;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Auth failed.');
        }
        return true;
    }
    getToken(request) {
        console.log(request.headers);
        if (!request.headers['authorization']) {
            return undefined;
        }
        const [type, token] = request.headers['authorization'].split(" ");
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
let WsAuthGuard = exports.WsAuthGuard = class WsAuthGuard {
    async canActivate(context) {
        let data = context.switchToWs().getData();
        let token = data.token;
        if (!token) {
            throw new websockets_1.WsException('No Token was provided.');
        }
        let jwt = require('jsonwebtoken');
        try {
            let decoded = jwt.verify(token, 'secret_key_here');
            data.token = decoded;
        }
        catch (err) {
            throw new websockets_1.WsException('Auth failed.');
        }
        return true;
    }
};
exports.WsAuthGuard = WsAuthGuard = __decorate([
    (0, common_1.Injectable)()
], WsAuthGuard);
//# sourceMappingURL=auth.guard.js.map