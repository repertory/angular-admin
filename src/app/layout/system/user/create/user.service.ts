import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

import {ParseService, ShowService} from '~shared/services/services.module';

@Injectable()
export class UserService extends ParseService {

  protected database = this.User;

  form: FormGroup;
  roles = [];

  constructor(private fb: FormBuilder, private router: Router, private show: ShowService) {
    super();

    this.form = this.fb.group({
      nick: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      username: [
        null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(32)],
        [(control: FormControl) => this.validatorExist(control, 'username')]
      ],
      email: [
        null,
        [Validators.required, Validators.email],
        [(control: FormControl) => this.validatorExist(control, 'email')]
      ],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      checkPassword: new FormControl('', [Validators.required, (control: FormControl): { [s: string]: boolean } => {
        if (this.form && control.value !== this.control('password').value) {
          return {confirm: true, error: true};
        }
      }]),
      roles: new FormControl([])
    });
  }

  onInit() {
    this.form.reset();
    Object.values(this.form.controls).forEach(control => control.markAsPristine());

    if (!this.roles.length) {
      const role = new this.Query(this.Role);
      role.addAscending('createdAt');
      role.find()
        .then(rows => this.roles = rows)
        .catch(this.handleError)
        .catch(err => this.show.error(err.message));
    }
  }

  onDestroy() {
    this.roles = [];
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

  onReset($event) {
    $event.preventDefault();
    this.onInit();
  }

  onSubmit($event) {
    $event.preventDefault();
    Object.values(this.form.controls).forEach(control => control.markAsDirty());
    if (!this.form.valid) {
      return false;
    }

    const acl = new this.ACL();
    acl.setRoleReadAccess('root', true);
    acl.setRoleWriteAccess('root', true);
    acl.setRoleReadAccess('admin', true);
    acl.setRoleWriteAccess('admin', true);
    acl.setPublicReadAccess(true);

    const data = new this.database();
    data.setACL(acl);
    Object.entries(this.form.value)
      .filter(([key]) => !['checkPassword', 'roles'].includes(key))
      .forEach(([key, val]) => {
        data.set(key, val);
      });

    data.save()
      .then(() => {
        const roles = this.control('roles').value || [];
        if (typeof roles !== 'object' || !roles.length) {
          return this.Promise.resolve();
        }
        return this.Object.saveAll(roles.map(role => {
          role.getUsers().add(data);
          return role;
        }));
      })
      .then(() => {
        this.show.success('添加成功');
        this.router.navigate(['/system/user']);
      })
      .catch(this.handleError)
      .catch(err => this.show.error(err.message));
  }

}
