import { CanActivate, ExecutionContext, Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {

    let request : any = context.switchToHttp().getRequest();
    
    let token = this.getToken(request);
    
    if(!token) {
      throw new UnauthorizedException('No Token was provided.');
    } 

    let jwt = require('jsonwebtoken');
    try { 
      let decoded = jwt.verify(token, 'secret_key_here');
      request.token = decoded;
    }  catch(err) {
      throw new UnauthorizedException('Auth failed.');
    }
    return true;
  }
  
  getToken(request : Request ) {

    console.log(request.headers);
    if(!request.headers['authorization']) {
      return undefined;
    }
    const [type, token] = request.headers['authorization'].split( " " );
    
    return type === 'Bearer' ? token : undefined;

  }
}

@Injectable()
export class WsAuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {

    let data : any = context.switchToWs().getData();
    
    let token = data.token;
    
    if(!token) {
      throw new WsException('No Token was provided.');
    } 

    let jwt = require('jsonwebtoken');
    try { 
      let decoded = jwt.verify(token, 'secret_key_here');
      data.token = decoded;
    }  catch(err) {
      throw new WsException('Auth failed.');
    }
    return true;
  }
  

}