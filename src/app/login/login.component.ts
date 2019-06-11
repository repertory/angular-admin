import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Parse } from 'parse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  qs: { [key: string]: any };
  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    this.route.params.subscribe(params => this.qs = params);
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  hasError(name: string, code: string, path?: string[]) {
    const control = this.form.controls[name];
    return control.dirty && control.hasError(code, path);
  }

  submit($event) {
    $event.preventDefault();
    Object.values(this.form.controls).forEach(control => control.markAsDirty());
    if (!this.form.valid) {
      return false;
    }

    Parse.User.logIn(this.form.value.username, this.form.value.password)
      .then(() => this.snackBar.open('已登录', '登录成功'))
      .then(() => this.router.navigate([this.qs.next || '/']))
      .catch(err => this.snackBar.open(err.message, '登录失败'));
  }

}
