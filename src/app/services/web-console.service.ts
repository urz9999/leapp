import { Injectable } from '@angular/core';
import {AppService} from '../services-system/app.service';
import {constants} from '../core/enums/constants';
import {Session} from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class WebConsoleService {

  browserExecutableMap = {};

  constructor(private appService: AppService) {
    this.browserExecutableMap[constants.MAC] = '';
    this.browserExecutableMap[constants.LINUX] = '';
    this.browserExecutableMap[constants.WINDOWS] = '';
  }

  private getCommandString(os: string): string {
    return '';
  }

  private isWebSessionProfileNew(session: Session) {
    return session.webProfile !== undefined;
  }
}
