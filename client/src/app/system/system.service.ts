import { RebirthHttp, POST, GET, Body, BaseUrl } from 'rebirth-http';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '@config';

@Injectable()
@BaseUrl(BASE_URL)
export class SystemService extends RebirthHttp {

  constructor(http: HttpClient) {
    super(http);
  }

  //  获取所有系统
  @GET('system/all')
  getSystemAll(@Body body): Observable<any> {
    return null;
  }

  //  添加系统
  @POST('system/add')
  addSystem(@Body body): Observable<any> {
    return null;
  }

  //  删除系统
  @POST('system/delete')
  deleteSystem(@Body body): Observable<any> {
    return null;
  }

  //  编辑系统
  @POST('system/edit')
  editSystem(@Body body): Observable<any> {
    return null;
  }

  //  获取所有系统类型
  @GET('system/allTypes')
  getAllTypes(@Body body):Observable<any>{
    return null;
  }

}
