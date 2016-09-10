import { Component, OnDestroy, OnInit, ViewChild } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { FilterTextComponent, FilterService, InitCapsPipe } from '../blocks/blocks';
import { Marathon, MarathonService } from './marathon.service';

@Component({
  selector: 'story-marathons',
  templateUrl: './app/marathons/marathon-list.component.html',
  directives: [FilterTextComponent, ROUTER_DIRECTIVES],
  styleUrls: ['./app/marathons/marathon-list.component.css'],
  pipes: [InitCapsPipe],
  providers: [FilterService]
})
export class MarathonListComponent implements OnDestroy, OnInit {
  private _dbResetSubscription: Subscription;

  marathon: Marathon[];
  filteredMarathons = this.marathons;
  @ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;

  constructor(
    private _filterService: FilterService,
    private _marathonService: MarathonService) { }

  filterChanged(searchText: string) {
    this.filteredMarathons = this._filterService.filter(searchText, ['id', 'name', 'type'], this.marathons);
  }

  getMarathons() {
    this.marathons = [];
    this._marathonService.getMarathons()
      .subscribe(marathons => {
        this.marathons = this.filteredMarathons = marathons;
        this.filterComponent.clear();
      });
  }

  ngOnDestroy() {
    this._dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.getMarathons();
    this._dbResetSubscription = this._marathonService.onDbReset
      .subscribe(() => this.getMarathons());
  }
}
