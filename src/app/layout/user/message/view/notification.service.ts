import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {ParseService, ShowService} from '~shared/services/services.module';

@Injectable()
export class NotificationService extends ParseService {

  protected database = this.Object.extend('Notification');

  private routeParams: object = {};

  data = null;

  set params(val) {
    this.routeParams = val;
    this.refresh();
  }

  get params() {
    return this.routeParams;
  }

  constructor(private router: Router, private show: ShowService) {
    super();
  }

  onInit() {
  }

  onDestroy() {
    this.data = null;
  }

  refresh() {
    const query = new this.Query(this.database);
    query.get(this.params['id'])
      .then(data => {
        this.data = data;

        // 修改为已读状态
        const readBy = data.relation('readBy');
        readBy.add(this.current);
        data.save();
      })
      .catch(this.handleError)
      .catch(err => {
        this.show.error(err.message);
        this.router.navigate(['/user/message']);
      });
  }

}
