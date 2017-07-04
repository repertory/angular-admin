import {Injectable} from '@angular/core';
import {SelectionModel, MdDialog} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ParseService} from '../../services/services.module';

import {DataTableInput} from './data-table';

import {CreateComponent} from './create/create.component';
import {DeleteComponent} from './delete/delete.component';
import {FilterComponent} from './filter/filter.component';
import {UpdateComponent} from './update/update.component';

@Injectable()
export class DataTableService {

  private input: DataTableInput;  // 初始化传入参数
  private query: BehaviorSubject<any[]> = new BehaviorSubject([]);

  public selection = new SelectionModel(true, []);  // 选中列表
  public data: any[] = [];                          // 当前数据列表
  public isLoading: Boolean = false;                // 加载中

  // 分页配置
  pagination = new Proxy({page: 1, maxPage: 1, pageSize: 5, total: 0}, {
    get: (target, key, receiver) => {
      let value = 0;
      switch (key) {
        case 'maxPage':
          value = Math.ceil(target.total / target.pageSize);
          break;
        default:
          value = Reflect.get(target, key, receiver);
      }
      return value;
    },
    set: (target, key, value, receiver) => {
      if (!Reflect.set(target, key, value, receiver)) {
        return false;
      }
      if (key === 'page') {
        // 清空已选项
        if (this.selection) {
          this.selection.clear();
        }
        this.setQuery();
      }
      return true;
    }
  });

  constructor(private parse: ParseService, private dialog: MdDialog) {
  }

  init(input: DataTableInput) {
    this.input = input;
    this.setQuery();
  }

  // 更新数据
  setQuery() {
    this.isLoading = true;
    this.parse.query(
      this.input.className,
      query => {
        query.count().then(res => this.pagination.total = res, err => this.pagination.total = 0);
        query.skip((this.pagination.page - 1) * this.pagination.pageSize);
        query.limit(this.pagination.pageSize);
      }
    )
      .filter(x => x.type && x.type === 'result')
      .map(x => x.result)
      .subscribe(
        next => {
          this.data = next;
          this.query.next(next);
          this.isLoading = false;
        },
        error => this.isLoading = false
      );
  }

  // 数据列表
  connect(): Observable<any[]> {
    return this.query.asObservable();
  }

  disconnect() {
    console.log('disconnect');
  }

  // 是否为全选状态
  isAllSelected(): boolean {
    return !this.selection.isEmpty() && this.selection.selected.length === this.data.length;
  }

  // 全选或取消
  selectAllToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.data.forEach(data => this.selection.select(data));
    }
  }

  // 分页操作
  incrementPage(increment: number) {
    if (this.canIncrementPage(increment)) {
      this.pagination.page += increment;
    }
  }

  // 判断是否可以分页
  canIncrementPage(increment: number): boolean {
    const increasedPage = this.pagination.page + increment;
    return increasedPage >= 1 && increasedPage <= this.pagination.maxPage;
  }

  // 设置每页显示数
  setPageSize(pageSize: number) {
    this.pagination.pageSize = pageSize;
    this.pagination.page = 1;
  }

  // 删除
  delete() {
    this.dialog.open(DeleteComponent, {
      data: {
        selection: this.selection
      }
    });
  }

  // 修改
  update() {
    this.dialog.open(UpdateComponent, {
      width: '560px',
      data: {
        selection: this.selection,
        options: this.input.options,
      }
    });
  }

  // 新增
  create() {
    this.dialog.open(CreateComponent, {
      width: '560px',
      data: {
        options: this.input.options
      }
    });
  }

  // 筛选
  filter() {
    this.dialog.open(FilterComponent, {
      data: {
        options: this.input.options
      }
    });
  }

  // 导出数据
  export() {
    console.log('export', this.data);
  }

}
