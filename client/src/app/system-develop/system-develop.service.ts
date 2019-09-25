import { RebirthHttp, POST, GET, Body, BaseUrl } from 'rebirth-http';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '@config';

@Injectable()
@BaseUrl(BASE_URL)
export class SystemDevelopService extends RebirthHttp {

  constructor(http: HttpClient) {
    super(http);
  }

  //  获取所有开发维护列表
  @GET('user/all')
  getAllList(@Body body): Observable<any> {
    return null;
  }

  //  添加开发维护人员
  @POST('user/add')
  addDeveloper(@Body body): Observable<any> {
    return null;
  }

  //  编辑开发维护人员
  @POST('user/edit')
  editDeveloper(@Body body): Observable<any> {
    return null;
  }

  //  删除开发维护人员
  @POST('user/delete')
  deleteDeveloper(@Body body): Observable<any> {
    return null;
  }
}
