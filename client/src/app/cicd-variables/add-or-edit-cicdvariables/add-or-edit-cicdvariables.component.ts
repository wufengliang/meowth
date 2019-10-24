import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { CICDVaribalesService } from '../cicd-variables.service';

@Component({
  selector: 'app-add-or-edit-cicdvariables',
  templateUrl: './add-or-edit-cicdvariables.component.html',
  styleUrls: ['./add-or-edit-cicdvariables.component.less']
})
export class AddOrEditCicdvariablesComponent implements OnInit {
  @Input() data: { [key: string]: any } = {};
  @Input() type: string;

  validateForm: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private subject: NzModalRef, private service: CICDVaribalesService, ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      environment: [this.data ? this.data.environment : null, Validators.required],
      port: [this.data ? this.data.port : null, Validators.required],
      ip: [this.data ? this.data.ip : null, Validators.required],
      path: [this.data ? this.data.path : null, Validators.required]
    });
  }

  checkFormstatus(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  isOk(): void {
    this.checkFormstatus();
    if (this.validateForm.status === 'INVALID') {
      return;
    }
    switch (this.type) {
      case 'add':
        //  添加CICD
        this.service.addCICD(this.validateForm.value).subscribe(
          () => {
            this.cancel('success');
          }
        )
        break;
      case 'edit':
        //  修改系统
        this.service.editCICD({ id: this.data._id, ...this.validateForm.value }).subscribe(
          () => {
            this.cancel('success');
          }
        )
        break;
      default:
        break;
    }
  }

  cancel(data?): void {
    this.subject.destroy(data);
  }

}
