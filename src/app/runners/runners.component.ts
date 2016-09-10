import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { RunnerComponent } from './runner.component';
import { RunnerListComponent } from './runner-list.component';
import { RunnerService } from './runner.service';

@Component({
  selector: 'story-runners-root',
  template: `
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', name: 'Runners', component: RunnerListComponent, useAsDefault: true },
	{ path: '/list/:id', name: 'Runners', component: RunnerListComponent	},
	{ path: '/:id', name: 'Runners', component: RunnerComponent }
])
export class RunnersComponent { }
