import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

import {ParseService, ShowService} from '~shared/services/services.module';

@Injectable()
export class UserService extends ParseService {

  protected database = this.User;

  private routeParams: object = {};

  form: FormGroup;
  roles = [];
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
      nick: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      username: [
        null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(32)],
        // [(control: FormControl) => this.validatorExist(control, 'username')]
      ],
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
    this.data = null;
  }

  refresh() {
    const query = new this.Query(this.database);
    query.get(this.params['id'])
      .then(data => {
        this.data = data;
        return this.User.roles(data);
      })
      .then(roles => {
        this.form.patchValue({
          nick: this.data.get('nick'),
          username: this.data.get('username'),
          roles: roles
        });
      })
      .catch(this.handleError)
      .catch(err => {
        this.show.error(err.message);
        this.router.navigate(['/system/user']);
      });
  }

  validatorExist(control: FormControl, key: string): Promise<any> {
    return new Promise(resolve => {
      this.Cloud.run('exist', {table: 'User', key: key, value: control.value, ignore: this.data.id || null})
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
    if (!this.form.valid || !this.data) {
      return false;
    }

    this.Promise.resolve(this.data)
      .then(data => {
        const roles = this.control('roles').value || [];
        return this.Object.saveAll(this.roles
          .filter(x => !roles.some(r => r.equals(x)))
          .map(role => {
            role.getUsers().remove(data);
            return role;
          })
          .concat(
            roles.map(role => {
              role.getUsers().add(data);
              return role;
            })
          )
        );
      })
      .then(() => {
        this.show.success('修改成功');
        this.router.navigate(['/system/user']);
      })
      .catch(this.handleError)
      .catch(err => this.show.error(err.message));
  }

}
