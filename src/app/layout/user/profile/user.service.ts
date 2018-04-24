import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import {ParseService, ShowService} from '~shared/services/services.module';

@Injectable()
export class UserService extends ParseService {

  form: FormGroup;

  constructor(private fb: FormBuilder, private show: ShowService) {
    super();

    this.form = this.fb.group({
      nick: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      username: new FormControl(null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(32)],
        [(control: FormControl) => this.validatorExist(control, 'username')]
      ),
      email: new FormControl(null,
        [Validators.required, Validators.email],
        // [(control: FormControl) => this.validatorExist(control, 'email')]
      )
    });
  }

  onInit() {
    this.form.reset();
    Object.values(this.form.controls).forEach(control => control.markAsPristine());
    this.form.patchValue({
      nick: this.current.get('nick'),
      username: this.current.get('username'),
      email: this.current.get('email'),
    });
  }

  onDestroy() {
  }

  validatorExist(control: FormControl, key: string): Promise<any> {
    return this.Cloud.run('exist', {table: 'User', key: key, value: control.value, ignore: this.current.id})
      .then(() => this.Promise.resolve({error: true, duplicated: true}))
      .catch(this.handleError)
      .catch(() => this.Promise.resolve());
  }

  hasError(controlName: string, errorCode: string, path?: string[]) {
    const control = this.form.controls[controlName];
    return control.dirty && control.hasError(errorCode, path);
  }

  control(controlName: string) {
    return this.form ? this.form.controls[controlName] : null;
  }

  onReset($event) {
    $event.preventDefault();
    this.onInit();
  }

  onSubmit($event) {
    $event.preventDefault();
    Object.values(this.form.controls).forEach(control => control.markAsDirty());
    if (!this.form.valid || !this.current) {
      return false;
    }

    const data = this.User.current();
    Object.entries(this.form.value)
      .filter(([key]) => key !== 'email')
      .forEach(([key, val]) => data.set(key, val));

    data.save()
      .then(() => this.show.success('修改成功'))
      .catch(this.handleError)
      .catch(err => {
        data.revert();
        this.show.error(err.message);
      });
  }

}
