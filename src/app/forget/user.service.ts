import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

import {ParseService, ShowService} from '~shared/services/services.module';

@Injectable()
export class UserService extends ParseService {

  form: FormGroup;
  params: object = {next: '/'};

  constructor(private fb: FormBuilder, private router: Router, private show: ShowService) {
    super();

    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email], [(control: FormControl) => this.validatorExist(control, 'email')]],
    });
  }

  validatorExist(control: FormControl, key: string): Promise<any> {
    return new Promise(resolve => {
      this.Cloud.run('exist', {table: 'User', key: key, value: control.value})
        .then(() => resolve())
        .catch(() => resolve({error: true, invalid: true}));
    });
  }

  hasError(controlName: string, errorCode: string, path?: string[]) {
    const control = this.form.controls[controlName];
    return control.dirty && control.hasError(errorCode, path);
  }

  control(controlName: string) {
    return this.form ? this.form.controls[controlName] : null;
  }

  onInit() {
    this.form.reset();
    Object.values(this.form.controls).forEach(control => control.markAsPristine());
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

    this.User.requestPasswordReset(this.form.value.email)
      .then(() => {
        this.show.success('邮件发送成功');
        this.router.navigate(['/login', this.params]);
      })
      .catch(this.handleError)
      .catch(err => this.show.error(err.message));
  }
}
