import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { RegisterComponent } from './register/register.component';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  viewProviders: [LoginService]
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private modal: NzModalService,
    private router: Router,
    private appSrv: AppService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
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

    this.service.login(this.validateForm.value).subscribe(
      ({ token }) => {
        this.appSrv.SET_VALUE('token', token);
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 0)
      }
    )
  }

  register(): void {
    this.modal.create({
      nzTitle: '注册',
      nzContent: RegisterComponent,
      nzFooter: null,
      nzMaskClosable: false,
    })
  }

}
