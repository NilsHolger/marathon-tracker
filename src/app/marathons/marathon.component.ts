import { Component, Input, OnDestroy, OnInit } from 'angular2/core';
import { CanDeactivate, ComponentInstruction, RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { EntityService, ModalService, ToastService } from '../blocks/blocks';
import { Marathon, MarathonService } from '../marathons/marathon.service';

@Component({
  selector: 'story-marathon',
  templateUrl: 'app/marathons/marathon.component.html',
  styles: ['.mdl-textfield__label {top: 0;}'],
  directives: [ROUTER_DIRECTIVES]
})
export class MarathonComponent implements CanDeactivate, OnDestroy, OnInit {
  private _dbResetSubscription: Subscription;

  @Input() marathon: Marathon;
  editMarathon: Marathon = <Marathon>{};

  constructor(
    private _entityService: EntityService,
    private _modalService: ModalService,
    private _routeParams: RouteParams,
    private _router: Router,
    private _toastService: ToastService,
    private _marathonService: MarathonService) { }

  cancel(showToast = true) {
    this.editMarathon = this._entityService.clone(this.marathon);
    if (showToast) {
      this._toastService.activate(`Cancelled changes to ${this.marathon.name}`);
    }
  }

  delete() {
    let msg = `Do you want to delete the ${this.marathon.name}?`;
    this._modalService.activate(msg).then((responseOK) => {
      if (responseOK) {
        this.cancel(false);
        this._marathonService.deleteMarathon(this.marathon)
          .subscribe(() => { // Success path
            this._toastService.activate(`Deleted ${this.marathon.name}`);
            this._gotoMarathons();
          },
          (err) => this._handleServiceError('Delete', err), // Failure path
          () => console.log('Delete Completed') // Completed actions
          );
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
    this._getMarathon();
    this._dbResetSubscription = this._marathonService.onDbReset
      .subscribe(() => {
        this._getMarathon();
      });
  }

  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    return !this.marathon ||
      !this._isDirty() ||
      this._modalService.activate();
  }

  save() {
    let marathon = this.marathon = this._entityService.merge(this.marathon, this.editMarathon);
    if (marathon.id == null) {
      this._marathonService.addMarathon(marathon)
        .subscribe(v => {
          this._setEditMarathon(v);
          this._toastService.activate(`Successfully added ${v.name}`);
          this._gotoMarathons();
        });
      return;
    }
    this._marathonService.updateMarathon(this.marathon)
      .subscribe(() => this._toastService.activate(`Successfully saved ${this.marathon.name}`));
  }

  private _getMarathon() {
    let id = +this._routeParams.get('id');
    if (id === 0) return;
    if (this.isAddMode()) {
      this.marathon = <Marathon>{ name: '', type: '' };
      this.editMarathon = this._entityService.clone(this.marathon);
      return;
    }
      this._marathonService.getMarathons().subscribe(marathon => {
         for (var i = 0; i < marathon.length; i++){
           if (marathon[i].id === id){
             this._setEditMarathon(marathon[i]);
           } 
        }
       })


  }

  private _gotoMarathons() {
    let id = this.marathon ? this.marathon.id : null;
    let route = ['Marathons', { id: id }];
    this._router.navigate(route);
  }

  private _handleServiceError(op: string, err: any) {
    console.error(`${op} error: ${err.message || err}`);
  }

  private _isDirty() {
    return this._entityService.propertiesDiffer(this.marathon, this.editMarathon);
  }

  private _setEditMarathon(marathon: Marathon) {
    if (marathon) {
      this.marathon = marathon;
      this.editMarathon = this._entityService.clone(this.marathon);
    } else {
      this._gotoMarathons();
    }
  }
}
