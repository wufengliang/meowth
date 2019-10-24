import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from './layout.service'
import { AppService } from '../app.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  viewProviders: [LayoutService],
})
export class LayoutComponent implements OnInit {

  isCollapsed: boolean = false;
  routerUrl: string = '';
  data: any;

  constructor(
    private router: Router,
    private service: LayoutService,
    private appSrv: AppService
  ) { }

  ngOnInit() {
    this.routerUrl = this.router.url;
    this.getUserData();
  }


  getUserData(): void {
    this.service.getPerson({}).subscribe(
      ({ data }) => {
        this.data = data;
      }
    )
  }

  loginout(): void {
    this.appSrv.DELETE_VALUE('token');
    this.router.navigate(['/login']);
  }
}
