import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SocketGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    console.log(context);
    // const bearerToken = context.args[0].handshake.headers.authorization.split(
    //   ' ',
    // )[1];
    console.log(context.args[0].handshake.headers);
    try {
      // const decoded = jwt.verify(bearerToken, jwtConstants.secret) as any;
      const decoded = { username: '' };
      // return true;
      // return new Promise((resolve, reject) => {
      //   return this.userService
      //     .findByUsername(decoded.username)
      //     .then((user) => {
      //       if (user) {
      //         resolve(user);
      //       } else {
      //         reject(false);
      //       }
      //     });
      // });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
