import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  private subscriptions: Array<Subscription> = [];

  code = 404;

  get message() {
    let message = '抱歉，您访问的页面不存在';
    switch (this.code) {
      case 403:
        message = '抱歉，你无权访问该页面';
        break;
      case 503:
        message = '服务器维护中，请稍后再试！';
        break;
    }
    return message;
  }

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      if (![403, 404, 503].includes(parseInt(params.code, 10))) {
        this.router.navigate(['/error/404']);
      }
      this.code = parseInt(params.code, 10);
    });
  }

}
