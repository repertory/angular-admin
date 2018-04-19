import {Component, OnInit, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {ObservableMedia, MediaChange} from '@angular/flex-layout';

import {UserService} from '~layout/user.service';
import {RoleService as Service} from './role.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchbar = {status: false, keyword: ''};
  pagination = {
    length: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100],
    showFirstLastButtons: true,
  };
  mediaColumns = {
    xs: ['name', 'alias', 'action'],
    sm: ['name', 'alias', 'users', 'action'],
    default: ['select', 'name', 'alias', 'users', 'createdAt', 'action']
  };
  currentMedia = null;

  get displayedColumns(): string[] {
    return this.mediaColumns[this.currentMedia] || this.mediaColumns['default'];
  }

  constructor(public service: Service, public user: UserService, public media: ObservableMedia) {
    this.media.subscribe((change: MediaChange) => this.currentMedia = change.mqAlias);
  }

  ngOnInit() {
    this.service.onInit();
  }

  ngOnDestroy() {
    this.service.onDestroy();
  }

  ngAfterViewInit() {
    this.service.dataSource.paginator = this.paginator;
    this.service.dataSource.sort = this.sort;
  }

}
