import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PikachuModule } from '@pixelmon/pikachu';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SystemDevelopService } from './system-develop.service';
import { SystemDevelopComponent } from './system-develop.component';
import { AddSystemDevelopComponent } from './add-system-develop/add-system-develop.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'developList',
    pathMatch: 'full'
  },
  {
    path: 'developList',
    component: SystemDevelopComponent,
  }
];

const COMPONENTS = [
  SystemDevelopComponent,
];

const ENTRYCOMPONENTS = [
  AddSystemDevelopComponent,
];


@NgModule({
  declarations: [...COMPONENTS, ...ENTRYCOMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PikachuModule,
    NgZorroAntdModule,
    RouterModule.forChild(routes)
  ],
  providers: [SystemDevelopService],
  entryComponents: [...ENTRYCOMPONENTS]
})
export class SystemDevelopModule { }
