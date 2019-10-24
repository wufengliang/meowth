import { RebirthHttp, POST, GET, Body, BaseUrl } from 'rebirth-http';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '@config';

@Injectable()
@BaseUrl(BASE_URL)
export class CICDVaribalesService extends RebirthHttp {

  constructor(http: HttpClient) {
    super(http);
  }

  //  获取所有系统
  @GET('cicd/all')
  getCICDAll(@Body body): Observable<any> {
    return null;
  }

  //  添加系统
  @POST('cicd/add')
  addCICD(@Body body): Observable<any> {
    return null;
  }

  //  删除系统
  @POST('cicd/delete')
  deleteCICD(@Body body): Observable<any> {
    return null;
  }

  //  编辑系统
  @POST('cicd/edit')
  editCICD(@Body body): Observable<any> {
    return null;
  }

}
