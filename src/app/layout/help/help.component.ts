import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowService} from '~shared/services/services.module';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {

  path: string;

  constructor(private route: ActivatedRoute, private router: Router, private show: ShowService) {
    this.route.params.subscribe(params => this.setPath(params.path));
  }

  onError(err) {
    this.show.error(err.message);
    this.router.navigate(['/error', {code: err.status || 404}]);
  }

  setPath(path) {
    const file = !path ? 'help' : path.replace(/-/g, '/');
    this.path = ['assets', 'markdown', file + '.md'].join('/');
  }

}
