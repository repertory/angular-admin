import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, ActivationStart } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { Parse } from 'parse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  fullscreen = true;
  siderLeftOpened = true;
  siderRightOpened = false;
  scrolled = false;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private scrollDispatcher: ScrollDispatcher,
    private changeDetector: ChangeDetectorRef,
    public snackBar: MatSnackBar
  ) {
    // 监听路由变化
    this.router.events
      .pipe(
        filter(event => event instanceof ActivationStart)
      )
      .subscribe((route: ActivationStart) => {
        this.fullscreen = route.snapshot.data.fullscreen === true;

        if (this.isSmallScreen) {
          this.siderLeftOpened = !this.isSmallScreen;
        }
      });

    // 监听设备变化
    this.breakpointObserver
      .observe([
        Breakpoints.Handset,
        Breakpoints.Tablet,
        Breakpoints.Web
      ])
      .subscribe(() => this.siderLeftOpened = !this.isSmallScreen);

    // 监听页面滚动
    this.scrollDispatcher
      .scrolled()
      .pipe(
        filter((x: any) => x.elementRef),
        map((x: any) => x.elementRef.nativeElement.scrollTop > 0),
        distinctUntilChanged()
      )
      .subscribe(scrolled => {
        this.scrolled = scrolled;
        this.changeDetector.detectChanges();
      });
  }

  get isSmallScreen(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 768px)');
  }

  get toolbarClass() {
    return {
      transparent: !this.scrolled,
      fixed: this.scrolled,
      'fixed-left': !this.isSmallScreen && this.siderLeftOpened && this.scrolled,
      'mat-elevation-z3': this.scrolled
    };
  }

  get user() {
    return Parse.User.current();
  }

  logout() {
    Parse.User.logOut()
      .then(() => this.snackBar.open('已退出登录', '退出成功'))
      .then(() => this.router.navigate(['/login']));
  }

}
