import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '~shared/services/services.module';

import {UserService as Service} from './user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(public service: Service, public config: ConfigService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: object) => this.service.params = params);
  }

  ngOnInit() {
    this.service.onInit();
  }

  ngOnDestroy() {
    this.service.onDestroy();
  }

}
