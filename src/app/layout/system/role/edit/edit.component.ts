import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UserService} from '~layout/user.service';
import {RoleService as Service} from './role.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(public service: Service, public user: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: object) => this.service.params = params);
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
