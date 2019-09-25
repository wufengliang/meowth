import { RebirthHttp, POST, GET, Body, BaseUrl } from 'rebirth-http';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '@config';

@Injectable()
@BaseUrl(BASE_URL)
export class LayoutService extends RebirthHttp {

  constructor(http: HttpClient) {
    super(http);
  }

  //  获取用户信息
  @POST('user/me')
  getPerson(@Body body): Observable<any> {
    return null;
  }

}
