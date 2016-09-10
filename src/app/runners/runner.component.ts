import { Component, Input, OnDestroy, OnInit } from 'angular2/core';
import { CanDeactivate, ComponentInstruction, RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { EntityService, ModalService, ToastService } from '../blocks/blocks';
import { Runner, RunnerService } from '../runners/runner.service';

@Component({
  selector: 'story-runner',
  templateUrl: 'app/runners/runner.component.html',
  styles: ['.mdl-textfield__label {top: 0;}'],
  directives: [ROUTER_DIRECTIVES]
})
export class RunnerComponent implements CanDeactivate, OnDestroy, OnInit {
  private _dbResetSubscription: Subscription;

  @Input() runner: Runner;
  runners: Runner[];
  editRunner: Runner = <Runner>{};

  constructor(
    private _runnerService: RunnerService,
    private _entityService: EntityService,
    private _modalService: ModalService,
    private _routeParams: RouteParams,
    private _router: Router,
    private _toastService: ToastService) { }

  cancel(showToast = true) {
    this.editRunner = this._entityService.clone(this.runner);
    if (showToast) {
      this._toastService.activate(`Cancelled changes to ${this.runner.name}`);
    }
  }

  delete() {
    let msg = `Do you want to delete ${this.runner.name}?`;
    this._modalService.activate(msg).then(responseOK => {
      if (responseOK) {
        this.cancel(false);
        console.log(this.runner.name);
        console.log(this.runners);
        for (var i = 0; i < this.runners.length; i++){
          if (this.runner.id === this.runners[i].id){
            this.runners.splice(i, 1);
          }
        }
        this._toastService.activate(`Deleted ${this.runner.name}`);
        this._gotoRunners();
        // this._runnerService.deleteRunner(this.runner)
        //   .subscribe(() => {
        //     this._toastService.activate(`Deleted ${this.runner.name}`);
        //     this._gotoRunners();
        //   });
      }
    });
  }

  isAddMode() {
    let id = +this._routeParams.get('id');
    return isNaN(id);
  }

  ngOnDestroy() {
    this._dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this._getRunner();
    this._dbResetSubscription = this._runnerService.onDbReset
      .subscribe(() => this._getRunner());
  }

  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    return !this.runner ||
      !this._isDirty() ||
      this._modalService.activate();
  }

  save() {
    let runner = this.runner = this._entityService.merge(this.runner, this.editRunner);
    if (runner.id == null) {
      this._runnerService.addRunner(runner)
        .subscribe(char => {
          this._setEditRunner(char);
          this._toastService.activate(`Successfully added ${char.name}`);
          this._gotoRunners();
        });
      return;
    }
    this._runnerService.updateRunner(runner)
      .subscribe(() => this._toastService.activate(`Successfully saved ${runner.name}`));
  }

  private _getRunner() {
    let id = +this._routeParams.get('id');
    if (id === 0) return;
    if (this.isAddMode()) {
      this.runner = <Runner>{ name: '', side: 'dark' };
      this.editRunner = this._entityService.clone(this.runner);
      return;
    }
       this._runnerService.getRunners().subscribe(runner => {
         for (var i = 0; i < runner.length; i++){
           if (runner[i].id === id){
             this._setEditRunner(runner[i]);
           } 
        }
       })
        

     var runners = this._runnerService.getRunners()
      .subscribe(runners => {
        this.runners = runners;
      });
  }

  private _gotoRunners() {
    let id = this.runner ? this.runner.id : null;
    let route = ['Runners', { id: id }];
    this._router.navigate(route);
  }

  private _handleServiceError(op: string, err: any) {
    console.error(`${op} error: ${err.message || err}`);
  }

  private _isDirty() {
    return this._entityService.propertiesDiffer(this.runner, this.editRunner);
  }

  private _setEditRunner(runner: Runner) {
    if (runner) {
      this.runner = runner;
      this.editRunner = this._entityService.clone(this.runner);
    } else {
      this._gotoRunners();
    }
  }
}
