import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { SystemDevelopService } from '../system-develop.service';

@Component({
  templateUrl: './add-system-develop.component.html',
  styleUrls: ['./add-system-develop.component.less']
})
export class AddSystemDevelopComponent implements OnInit {

  @Input() data: { [key: string]: any } = {};
  @Input() type: string;

  validateForm: FormGroup;
  loading: boolean = false;
  allTypes: Array<any> = [];

  constructor(private fb: FormBuilder, private subject: NzModalRef, private service: SystemDevelopService, ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [this.data ? this.data.name : null, Validators.required],
      username: [this.data ? this.data.username : null, Validators.required],
      role: [this.data ? this.data.role : null, Validators.required],
      mobile: [this.data ? this.data.mobile : null, Validators.required],
      contactQQ: [this.data ? this.data.contactQQ : null, Validators.required],
      email: [this.data ? this.data.email : null, Validators.required]
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
        //  添加系统
        this.service.addDeveloper(this.validateForm.value).subscribe(
          () => {
            this.cancel('success');
          }
        )
        break;
      case 'edit':
        //  修改系统
        this.service.editDeveloper({ id: this.data._id, ...this.validateForm.value }).subscribe(
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
