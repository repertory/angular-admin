import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

import {ParseService, ShowService} from '~shared/services/services.module';

@Injectable()
export class MenuService extends ParseService {

  protected database = this.Object.extend('Menu');

  form: FormGroup;
  roles = [];

  constructor(private fb: FormBuilder, private router: Router, private show: ShowService) {
    super();

    this.form = this.fb.group({
      group: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      icon: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      url: new FormControl('', [Validators.required, Validators.maxLength(128)]),
      orderBy: new FormControl(0, [Validators.required, Validators.min(1)]),
      roles: new FormControl([])
    });
  }

  onInit() {
    this.form.reset();
    Object.values(this.form.controls).forEach(control => control.markAsPristine());
    this.form.patchValue({
      orderBy: 0,
      roles: []
    });

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
    if (typeof this.control('roles').value === 'object' && this.control('roles').value.length) {
      this.control('roles').value.forEach(role => acl.setRoleReadAccess(role, true));
    } else {
      acl.setPublicReadAccess(true);
    }

    const data = new this.database();
    data.setACL(acl);
    Object.entries(this.form.value)
      .filter(([key]) => !['roles'].includes(key))
      .forEach(([key, val]) => {
        data.set(key, val);
      });

    if (typeof this.control('roles').value === 'object' && this.control('roles').value.length) {
      const relation = data.relation('roles');
      relation.add(this.control('roles').value);
    }

    data.save()
      .then(() => {
        this.show.success('添加成功');
        this.router.navigate(['/system/menu']);
      })
      .catch(this.handleError)
      .catch(err => this.show.error(err.message));
  }

}
