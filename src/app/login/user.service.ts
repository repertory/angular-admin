import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ParseService, ShowService} from '~shared/services/services.module';

@Injectable()
export class UserService extends ParseService {

  form: FormGroup;
  params: object = {next: '/'};

  constructor(private fb: FormBuilder, private router: Router, private show: ShowService) {
    super();

    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
    });
  }

  hasError(controlName: string, errorCode: string, path?: string[]) {
    const control = this.form.controls[controlName];
    return control.dirty && control.hasError(errorCode, path);
  }

  onInit() {
    this.form.reset();
    Object.values(this.form.controls).forEach(control => control.markAsPristine());

    if (this.current) {
      this.router.navigate([this.params['next'] || '/']);
    }
  }

  onDestroy() {
    this.params = {next: '/'};
  }

  onSubmit($event) {
    $event.preventDefault();
    Object.values(this.form.controls).forEach(control => control.markAsDirty());
    if (!this.form.valid) {
      return false;
    }

    this.User.logIn(this.form.value.username, this.form.value.password)
      .then(() => {
        this.show.success('登录成功');
        this.router.navigate([this.params['next'] || '/']);
      })
      .catch(this.handleError)
      .catch(err => this.show.error(err.message));
  }
}
