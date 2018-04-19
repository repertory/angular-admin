import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';

import {UserService} from '~layout/user.service';
import {MenuService as Service} from './menu.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(public service: Service, public user: UserService) {
  }

  ngOnInit() {
    this.service.onInit();
  }

  ngOnDestroy() {
    this.service.onDestroy();
  }

  ngAfterViewInit() {
    this.user.checkRole(['root', 'admin']);
  }

}
