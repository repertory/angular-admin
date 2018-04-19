import {Component, OnInit, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {ObservableMedia, MediaChange} from '@angular/flex-layout';
import {ActivatedRoute} from '@angular/router';

import {UserService} from '~layout/user.service';
import {UserService as Service} from './user.service';

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
    xs: ['username', 'nick', 'action'],
    sm: ['username', 'nick', 'emailVerified', 'createdAt', 'action'],
    default: ['select', 'username', 'nick', 'emailVerified', 'roles', 'createdAt', 'action']
  };
  currentMedia = null;

  get displayedColumns(): string[] {
    return this.mediaColumns[this.currentMedia] || this.mediaColumns['default'];
  }

  constructor(public service: Service, public user: UserService, public media: ObservableMedia, private route: ActivatedRoute) {
    this.media.subscribe((change: MediaChange) => this.currentMedia = change.mqAlias);
    this.route.params.subscribe((params: object) => this.service.params = params);
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
