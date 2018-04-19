import {Injectable} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

import {ParseService, ShowService} from '~shared/services/services.module';
import {FormGroup} from '@angular/forms';

@Injectable()
export class UserService extends ParseService {

  protected database = this.User;

  private routeParams: object = {};

  selection = new SelectionModel(true, []);
  dataSource = new MatTableDataSource([]);
  loading = false;

  set params(params: object) {
    this.routeParams = params;
    this.refresh();
  }

  get params(): object {
    return this.routeParams;
  }

  constructor(private show: ShowService) {
    super();

    // 自定义筛选
    this.dataSource.filterPredicate = function (data, filter: string) {
      return JSON.stringify(data, null, 2).toLowerCase().includes(filter.trim().toLowerCase());
    };
    // 自定义排序
    this.dataSource.sortingDataAccessor = function (data: any, sortHeaderId: string) {
      return data.get(sortHeaderId);
    };
  }

  onInit() {
    this.refresh();
  }

  onDestroy() {
    this.selection.clear();
    this.dataSource.data = [];
    this.dataSource.filter = '';
    this.loading = false;
  }

  // 是否全选
  isAllSelected(): boolean {
    return !this.selection.isEmpty() && this.selection.selected.length === this.dataSource.filteredData.length;
  }

  // 全选或取消
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }

  // 搜索关键字
  search(keyword: string) {
    this.dataSource.filter = keyword.trim().toLowerCase();
    this.selection.clear();
  }

  // 刷新数据
  refresh() {
    if (this.loading) {
      return false;
    }
    this.loading = true;

    let query = new this.Query(this.database);
    if (this.params['role']) {
      query = this.Role.createWithoutData(this.params['role']).getUsers().query();
    }

    query.addDescending('createdAt');
    return query.find()
      .then(rows => this.dataSource.data = rows)
      .catch(this.handleError)
      .done(() => {
        this.selection.clear();
        this.loading = false;
      });
  }

  // 单条删除
  destroy(data) {
    this.show.confirm({title: '删除提示', content: '确定要删除这条数据吗？'})
      .then(() => data.destroy())
      .then(() => {
        this.show.success('删除成功');
        this.refresh();
      })
      .catch(this.handleError)
      .catch(err => this.show.error(err.message));
  }

  // 批量删除
  destroySelected() {
    this.show.confirm({
      title: '删除提示',
      content: '确定要删除选中的' + this.selection.selected.length + '条数据吗？'
    })
      .then(() => this.Object.destroyAll(this.selection.selected))
      .then(() => {
        this.show.success('删除成功');
        this.refresh();
      })
      .catch(this.handleError)
      .catch(err => this.show.error(err.message));
  }

}
