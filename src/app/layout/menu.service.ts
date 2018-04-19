import {Injectable} from '@angular/core';
import {ParseService} from '~shared/services/services.module';

@Injectable()
export class MenuService extends ParseService {

  protected database = 'Menu';

  private dataValue: any[] = [];
  private keywordValue: string = '';

  group: any[] = [];

  get data() {
    return this.dataValue;
  }

  set data(val) {
    this.dataValue = val;
    this.keyword = '';
  }

  get keyword() {
    return this.keywordValue;
  }

  set keyword(val) {
    this.keywordValue = val;
    this.setGroup();
  }

  load() {
    if (this.data.length) {
      return this.Promise.resolve(this.data);
    }

    const query = new this.Query(this.database);
    query.addAscending('orderBy');
    return query.find()
      .then(rows => {
        this.data = rows;
        return this.Promise.resolve(rows);
      })
      .catch(this.handleError);
  }

  setGroup() {
    const rows = this.data.filter(row => row.get('name').includes(this.keyword) || row.get('group').includes(this.keyword));

    const groups = Array.from(new Set(rows.map(row => row.get('group'))));
    this.group = groups.map(group => {
      return {
        name: group,
        children: rows.filter(row => row.get('group') === group)
      };
    });
  }

  onDestroy() {
    this.data = [];
  }

}
