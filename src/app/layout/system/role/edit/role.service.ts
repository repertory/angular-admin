import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

import {ParseService, ShowService} from '~shared/services/services.module';

@Injectable()
export class RoleService extends ParseService {

  protected database = this.Role;

  private routeParams: object = {};

  form: FormGroup;
  data = null;

  set params(val: object) {
    this.routeParams = val;
    this.refresh();
  }

  get params(): object {
    return this.routeParams;
  }

  constructor(private fb: FormBuilder, private router: Router, private show: ShowService) {
    super();

    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(/^[a-z]+$/)]),
      alias: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    });
  }

  onInit() {
    this.form.reset();
    Object.values(this.form.controls).forEach(control => control.markAsPristine());
  }

  onDestroy() {
    this.data = null;
  }

  refresh() {
    const query = new this.Query(this.database);
    query.get(this.params['id'])
      .then(data => {
        this.data = data;
        this.form.patchValue({
          name: this.data.get('name'),
          alias: this.data.get('alias'),
        });
      })
      .catch(this.handleError)
      .catch(err => {
        this.show.error(err.message);
        this.router.navigate(['/system/role']);
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
    if (!this.form.valid || !this.data) {
      return false;
    }

    const acl = new this.ACL();
    acl.setRoleReadAccess('root', true);
    acl.setRoleWriteAccess('root', true);
    acl.setRoleReadAccess('admin', true);
    acl.setRoleWriteAccess('admin', true);
    acl.setPublicReadAccess(true);

    const data = this.data;
    data.setACL(acl);
    Object.entries(this.form.value)
      .filter(([key]) => key !== 'name')
      .forEach(([key, val]) => {
        data.set(key, val);
      });

    data.save()
      .then(() => {
        this.show.success('修改成功');
        this.router.navigate(['/system/role']);
      })
      .catch(this.handleError)
      .catch(err => {
        data.revert();
        this.show.error(err.message);
      });
  }

}
