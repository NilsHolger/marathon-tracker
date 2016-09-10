import { Component, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { MarathonListComponent } from './marathon-list.component';
import { MarathonComponent } from './marathon.component';
import { MarathonService } from './marathon.service';

@Component({
  selector: 'story-marathons-root',
  template: `
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [MarathonService]
})
@RouteConfig([
  { path: '/', name: 'Marathons', component: MarathonListComponent, useAsDefault: true },
	{ path: '/list/:id', name: 'Marathons', component: MarathonListComponent	},
	{ path: '/:id', name: 'Marathon', component: MarathonComponent }
])
export class MarathonsComponent { }
