import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

import {ParseService, ShowService} from '~shared/services/services.module';

@Injectable()
export class UserService extends ParseService {

  protected database = this.User;

  form: FormGroup;
  params: object = {next: '/'};

  constructor(private fb: FormBuilder, private router: Router, private show: ShowService) {
    super();

    this.form = this.fb.group({
      nick: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      email: [null, [Validators.required, Validators.email], [(control: FormControl) => this.validatorExist(control, 'email')]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      checkPassword: [null, [Validators.required, (control: FormControl): { [s: string]: boolean } => {
        if (this.form && control.value !== this.control('password').value) {
          return {confirm: true, error: true};
        }
      }]],
    });
  }

  validatorExist(control: FormControl, key: string): Promise<any> {
    return new Promise(resolve => {
      this.Cloud.run('exist', {table: 'User', key: key, value: control.value})
        .then(() => resolve({error: true, duplicated: true}))
        .catch(() => resolve());
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

    const data = new this.database();
    data.set('username', this.form.value.email);
    Object.entries(this.form.value)
      .filter(([key]) => !['checkPassword'].includes(key))
      .forEach(([key, val]) => {
        data.set(key, val);
      });
    data.signUp(null)
      .then(() => {
        this.show.success('注册成功');
        this.router.navigate([this.params['next'] || '/']);
      })
      .catch(this.handleError)
      .catch(err => this.show.error(err.message));
  }

}
