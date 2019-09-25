import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { RebirthHttpProvider } from 'rebirth-http';
import { BASE_URL } from '@config';
import { HttpResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';
import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private rebirthHttpProvider: RebirthHttpProvider,
    private nitification: NzNotificationService,
    private appSrv: AppService,
  ) { }

  get api() {
    return BASE_URL;
  }

  get token() {
    return this.appSrv.GET_VALUE('token');
  }

  ngOnInit() {
    if (!this.token) {
      this.router.navigate(['/login']);
    }
    this.apiSetup();
  }

  private apiSetup(): void {
    this.rebirthHttpProvider
      .baseUrl(this.api)
      .addInterceptor({
        request: request => {
          let requestOpt = {
            setHeaders: { Authorization: `Bearer ${this.token}` }
          };
          if (this.token) {
            return request.clone(requestOpt);
          }
          return request;
        },
        response: (response: HttpResponse<any>) => {
          if (response instanceof Error) {
            return;
          }
          let body = response.body || {};
          if (response.status !== 200 || body.code !== 200) {
            this.nitification.create('error', '错误提示', body.message || '异常错误');
          }
        }
      })
  }

}
