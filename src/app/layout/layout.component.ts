import {Component, OnInit, OnDestroy, DoCheck, ViewChild} from '@angular/core';
import {Router, ActivationStart, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {ObservableMedia, MediaChange} from '@angular/flex-layout';
import {MatSidenav} from '@angular/material';
import 'rxjs/add/operator/filter';

import {ConfigService} from '~shared/services/services.module';
import {MenuService} from './menu.service';
import {UserService} from './user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy, DoCheck {

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  isOpen = true;
  isScreenSmall = false;
  snapshot: ActivatedRouteSnapshot;

  constructor(public menu: MenuService,
              public user: UserService,
              public config: ConfigService,
              public media: ObservableMedia,
              private router: Router,
              private route: ActivatedRoute) {
    // 监听窗口变化
    this.media.subscribe((change: MediaChange) => {
      this.isScreenSmall = (change.mqAlias === 'xs') || (change.mqAlias === 'sm');
      this.isOpen = !this.isScreenSmall;
    });
    // 监听路由变化
    this.router.events
      .filter(event => event instanceof ActivationStart)
      .subscribe((data: ActivationStart) => {
        this.snapshot = data.snapshot;

        if (this.sidenav && this.isScreenSmall) {
          this.sidenav.close();
        }
      });
  }

  ngOnInit() {
    this.user.onInit();

    if (!this.snapshot) {
      let snapshot = this.route.snapshot;
      while (snapshot.firstChild) {
        this.snapshot = snapshot.firstChild;
        snapshot = snapshot.firstChild;
      }
    }
  }

  ngOnDestroy() {
    this.menu.onDestroy();
    this.user.onDestroy();
  }

  ngDoCheck() {
    this.user.status().then(status => {
      switch (status) {
        case 'logout':
          this.menu.data = [];
          break;
      }
    });
  }

}
