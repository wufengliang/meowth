import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PikachuModule } from '@pixelmon/pikachu';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CicdVariablesComponent } from './cicd-variables.component';
import { CICDVaribalesService } from './cicd-variables.service';
import { AddOrEditCicdvariablesComponent } from './add-or-edit-cicdvariables/add-or-edit-cicdvariables.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cicdList',
    pathMatch: 'full'
  },
  {
    path: 'cicdList',
    component: CicdVariablesComponent,
  }
];

const COMPONENTS = [
  CicdVariablesComponent,
];

const ENTRYCOMPONENTS = [
  AddOrEditCicdvariablesComponent,
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
  providers: [CICDVaribalesService],
  entryComponents: [...ENTRYCOMPONENTS]
})
export class CicdVariablesModule { }
