import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { SystemService } from '../system.service';

@Component({
  selector: 'app-add-oredit-system',
  templateUrl: './add-oredit-system.component.html',
  styleUrls: ['./add-oredit-system.component.less']
})
export class AddOreditSystemComponent implements OnInit {

  @Input() data: { [key: string]: any } = {};
  @Input() type: string;

  validateForm: FormGroup;
  loading: boolean = false;
  allTypes: Array<any> = [];

  constructor(private fb: FormBuilder, private subject: NzModalRef, private service: SystemService, ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [this.data ? this.data.name : null, Validators.required],
      systemCode: [this.data ? this.data.systemCode : null, Validators.required],
      systemType: [this.data ? this.data.systemType : null, Validators.required]
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
        this.service.addSystem(this.validateForm.value).subscribe(
          () => {
            this.cancel('success');
          }
        )
        break;
      case 'edit':
        //  修改系统
        this.service.editSystem({ id: this.data._id, ...this.validateForm.value }).subscribe(
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
