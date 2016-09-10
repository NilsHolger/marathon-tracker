import { Component, OnDestroy, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { Runner, RunnerService } from '../runners/runners';
import { ToastService } from '../blocks/blocks';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard/dashboard.component.html',
  styleUrls: ['app/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnDestroy, OnInit {
  private _dbResetSubscription: Subscription;

  runners: Observable<Runner[]>;

  constructor(
    private _runnerService: RunnerService,
    private _router: Router,
    private _toastService: ToastService) { }

  getRunners() {
    // this._spinnerService.show();
    this.runners = this._runnerService.getRunners()
      .catch(e => {
        this._toastService.activate(`${e}`);
        return Observable.of();
      })
      // .finally(() => { this._spinnerService.hide(); })
  }

  gotoDetail(runner: Runner) {
    let link = ['Runners', 'Runners', { id: runner.id }];
    this._router.navigate(link);
  }

  ngOnDestroy() {
    this._dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    this.getRunners();
    this._dbResetSubscription = this._runnerService.onDbReset
      .subscribe(() => this.getRunners());
  }
}
