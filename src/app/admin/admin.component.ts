import {Component, HostBinding, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {MdSidenav, OverlayContainer} from '@angular/material';

import {AdminMenuService} from './admin-menu.service';
import {AdminUserService} from './admin-user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {

  @HostBinding('class.dark-theme') isDarkTheme = false;
  @ViewChild(MdSidenav) sidenav: MdSidenav;

  private subscriptions: Array<Subscription> = [];

  constructor(public menuService: AdminMenuService,
              public userService: AdminUserService,
              private router: Router,
              private overlayContainer: OverlayContainer) {
  }

  ngOnInit() {
    // 菜单收缩
    const sidenav = this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
    this.subscriptions.push(sidenav);
  }

  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  isScreenSmall(): boolean {
    return window.matchMedia(`(max-width: 768px)`).matches;
  }

  changeTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.overlayContainer.themeClass = this.isDarkTheme ? 'dark-theme' : 'light-theme';
  }

}
