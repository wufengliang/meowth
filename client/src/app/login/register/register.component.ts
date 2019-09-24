/*
 * @Author: WuFengliang
 * @Date: 2019-09-11 16:59:59
 * @Description:   undefined
 * @Last Modified time: 2019-09-11 16:59:59
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  viewProviders: [LoginService]
})

export class RegisterComponent implements OnInit {

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder, private service: LoginService, private msg: NzMessageService, private subject: NzModalRef
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: [null, [Validators.required]],
      telPhone: [null, [Validators.required]],
      contactQQ: [null, [Validators.required]],
      isLeader: false
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'INVALID') {
      return;
    }
    this.service.register(this.validateForm.value).subscribe(
      () => {
        this.msg.success('注册成功');
        this.subject.destroy('success');
      }
    )
  }
}
