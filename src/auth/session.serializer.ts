import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PassportStatic } from 'passport';

@Injectable()
export class SessionSerializer implements PassportSerializer {
  getPassportInstance(): PassportStatic {
    throw new Error('Method not implemented.');
  }
  serializeUser(user: any, done: (err: Error, user: any) => void): void {
    done(null, user);
  }
  deserializeUser(user: any, done: (err: Error, user: any) => void): void {
    done(null, user);
  }
}
