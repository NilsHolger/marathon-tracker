import { Component, OnDestroy, OnInit, ViewChild } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { Runner, RunnerService } from './runner.service';
import { SortRunnersPipe } from './sort-runners.pipe';
import { FilterService, FilterTextComponent } from '../blocks/blocks';

@Component({
  selector: 'story-runners',
  templateUrl: './app/runners/runner-list.component.html',
  directives: [FilterTextComponent, ROUTER_DIRECTIVES],
  styleUrls: ['./app/runners/runner-list.component.css'],
  pipes: [SortRunnersPipe],
  providers: [FilterService]
})
export class RunnerListComponent implements OnDestroy, OnInit {
  private _dbResetSubscription: Subscription;

  runners: Runner[];
  filteredRunners = this.runners;
  @ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;

  constructor(private _runnerService: RunnerService,
    private _filterService: FilterService) { }

  filterChanged(searchText: string) {
    this.filteredRunners = this._filterService.filter(searchText, ['id', 'name', 'side'], this.runners);
  }

  getRunners() {
    this.runners = [];

    this._runnerService.getRunners()
      .subscribe(runners => {
        this.runners = this.filteredRunners = runners;
        this.filterComponent.clear();
      });
           
  }

  ngOnDestroy() {
    this._dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.getRunners();
    this._dbResetSubscription = this._runnerService.onDbReset
      .subscribe(() => this.getRunners());
  }
}
