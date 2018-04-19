import {Component, OnInit} from '@angular/core';
import {Router, ActivationStart} from '@angular/router';
import 'rxjs/add/operator/filter';

import {ShowService} from '~shared/services/services.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private show: ShowService, private router: Router) {
  }

  ngOnInit() {
    // 监听路由变化
    this.router.events
      .filter(event => event instanceof ActivationStart)
      .subscribe((data: ActivationStart) => {
        this.show.title(data.snapshot.data.title);
      });
  }

}
