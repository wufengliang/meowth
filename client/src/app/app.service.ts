
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  SET_VALUE(name, value) {
    window.sessionStorage.setItem(name, value);
  }

  GET_VALUE(name) {
    return window.sessionStorage.getItem(name);
  }

  DELETE_VALUE(name) {
    window.sessionStorage.removeItem(name);
  }
}
