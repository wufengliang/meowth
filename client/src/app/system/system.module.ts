import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemComponent } from './system.component';
import { RouterModule, Routes } from '@angular/router';
import { PikachuModule } from '@pixelmon/pikachu';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SystemService } from './system.service';
import { AddOreditSystemComponent } from './add-oredit-system/add-oredit-system.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'systemList',
    pathMatch: 'full'
  },
  {
    path: 'systemList',
    component: SystemComponent,
  }
];

const COMPONENTS = [
  SystemComponent,
];

const ENTRYCOMPONENTS = [
  AddOreditSystemComponent,
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
  providers: [SystemService,],
  entryComponents: [...ENTRYCOMPONENTS]
})
export class SystemModule { }
