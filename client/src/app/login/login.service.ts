import { RebirthHttp, POST, GET, Body, BaseUrl } from 'rebirth-http';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '@config';

@Injectable()
@BaseUrl(BASE_URL)
export class LoginService extends RebirthHttp {

  constructor(http: HttpClient) {
    super(http);
  }

  //  登录
  @POST('user/login')
  login(@Body body): Observable<any> {
    return null;
  }

  //  注册
  @POST('user/register')
  register(@Body body): Observable<any> {
    return null;
  }

}
