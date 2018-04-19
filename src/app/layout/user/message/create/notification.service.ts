import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

import {ParseService, ShowService} from '~shared/services/services.module';

@Injectable()
export class NotificationService extends ParseService {

  protected database = this.Object.extend('Notification');

  form: FormGroup;
  roles = [];
  users = [];

  constructor(private fb: FormBuilder, private router: Router, private show: ShowService) {
    super();

    this.form = this.fb.group({
      content: new FormControl('', [Validators.required]),
      type: new FormControl('public', [Validators.required]),
      role: new FormControl(null, [(control: FormControl) => {
        if (this.form && this.control('type').value === 'role' && !control.value) {
          return {required: true};
        }
      }]),
      user: new FormControl(null, [(control: FormControl) => {
        if (this.form && this.control('type').value === 'user' && !control.value) {
          return {required: true};
        } else if (typeof control.value !== 'object') {
          return {error: true, type: true};
        }
      }]),
    });

    this.control('type').valueChanges.subscribe(type => {
      switch (type) {
        case 'role':
          this.control('user').setValue(null);

          if (!this.roles.length) {
            const role = new this.Query(this.Role);
            role.addAscending('createdAt');
            role.find()
              .then(rows => this.roles = rows)
              .catch(this.handleError)
              .catch(err => this.show.error(err.message));
          }
          break;
        case 'user':
          this.control('role').setValue(null);
          break;
        default:
          this.control('role').setValue(null);
          this.control('user').setValue(null);
      }
    });

    this.control('user').valueChanges.subscribe(keyword => {
      if (typeof keyword !== 'string' || keyword.length < 2) {
        return;
      }
      const query1 = new this.Query(this.User);
      query1.matches('username', keyword);

      const query2 = new this.Query(this.User);
      query2.matches('nick', keyword);

      this.Query.or(query1, query2).find()
        .then(rows => this.users = rows)
        .catch(this.handleError)
        .catch(err => this.show.error(err.message));
    });
  }

  onInit() {
    this.form.reset();
    Object.values(this.form.controls).forEach(control => control.markAsPristine());
    this.form.patchValue({type: 'public'});
  }

  onDestroy() {
    this.roles = [];
    this.users = [];
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

    const data = new this.database();
    data.set('sender', this.current);
    data.set('public', this.form.controls['type'].value === 'public');
    Object.entries(this.form.value)
      .forEach(([key, val]) => {
        data.set(key, val);
      });

    data.save()
      .then(() => {
        this.show.success('发布成功');
        this.router.navigate(['/user/message']);
      })
      .catch(this.handleError)
      .catch(err => this.show.error(err.message));
  }

}
