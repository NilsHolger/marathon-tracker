System.register(['angular2/core', 'angular2/router', '../blocks/blocks', '../marathons/marathon.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, blocks_1, marathon_service_1;
    var MarathonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (blocks_1_1) {
                blocks_1 = blocks_1_1;
            },
            function (marathon_service_1_1) {
                marathon_service_1 = marathon_service_1_1;
            }],
        execute: function() {
            MarathonComponent = (function () {
                function MarathonComponent(_entityService, _modalService, _routeParams, _router, _toastService, _marathonService) {
                    this._entityService = _entityService;
                    this._modalService = _modalService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._toastService = _toastService;
                    this._marathonService = _marathonService;
                    this.editMarathon = {};
                }
                MarathonComponent.prototype.cancel = function (showToast) {
                    if (showToast === void 0) { showToast = true; }
                    this.editMarathon = this._entityService.clone(this.marathon);
                    if (showToast) {
                        this._toastService.activate("Cancelled changes to " + this.marathon.name);
                    }
                };
                MarathonComponent.prototype.delete = function () {
                    var _this = this;
                    var msg = "Do you want to delete the " + this.marathon.name + "?";
                    this._modalService.activate(msg).then(function (responseOK) {
                        if (responseOK) {
                            _this.cancel(false);
                            _this._marathonService.deleteMarathon(_this.marathon)
                                .subscribe(function () {
                                _this._toastService.activate("Deleted " + _this.marathon.name);
                                _this._gotoMarathons();
                            }, function (err) { return _this._handleServiceError('Delete', err); }, // Failure path
                            function () { return console.log('Delete Completed'); } // Completed actions
                             // Completed actions
                            );
                        }
                    });
                };
                MarathonComponent.prototype.isAddMode = function () {
                    var id = +this._routeParams.get('id');
                    return isNaN(id);
                };
                MarathonComponent.prototype.ngOnDestroy = function () {
                    this._dbResetSubscription.unsubscribe();
                };
                MarathonComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    componentHandler.upgradeDom();
                    this._getMarathon();
                    this._dbResetSubscription = this._marathonService.onDbReset
                        .subscribe(function () {
                        _this._getMarathon();
                    });
                };
                MarathonComponent.prototype.routerCanDeactivate = function (next, prev) {
                    return !this.marathon ||
                        !this._isDirty() ||
                        this._modalService.activate();
                };
                MarathonComponent.prototype.save = function () {
                    var _this = this;
                    var marathon = this.marathon = this._entityService.merge(this.marathon, this.editMarathon);
                    if (marathon.id == null) {
                        this._marathonService.addMarathon(marathon)
                            .subscribe(function (v) {
                            _this._setEditMarathon(v);
                            _this._toastService.activate("Successfully added " + v.name);
                            _this._gotoMarathons();
                        });
                        return;
                    }
                    this._marathonService.updateMarathon(this.marathon)
                        .subscribe(function () { return _this._toastService.activate("Successfully saved " + _this.marathon.name); });
                };
                MarathonComponent.prototype._getMarathon = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    if (id === 0)
                        return;
                    if (this.isAddMode()) {
                        this.marathon = { name: '', type: '' };
                        this.editMarathon = this._entityService.clone(this.marathon);
                        return;
                    }
                    this._marathonService.getMarathons().subscribe(function (marathon) {
                        for (var i = 0; i < marathon.length; i++) {
                            if (marathon[i].id === id) {
                                _this._setEditMarathon(marathon[i]);
                            }
                        }
                    });
                };
                MarathonComponent.prototype._gotoMarathons = function () {
                    var id = this.marathon ? this.marathon.id : null;
                    var route = ['Marathons', { id: id }];
                    this._router.navigate(route);
                };
                MarathonComponent.prototype._handleServiceError = function (op, err) {
                    console.error(op + " error: " + (err.message || err));
                };
                MarathonComponent.prototype._isDirty = function () {
                    return this._entityService.propertiesDiffer(this.marathon, this.editMarathon);
                };
                MarathonComponent.prototype._setEditMarathon = function (marathon) {
                    if (marathon) {
                        this.marathon = marathon;
                        this.editMarathon = this._entityService.clone(this.marathon);
                    }
                    else {
                        this._gotoMarathons();
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], MarathonComponent.prototype, "marathon", void 0);
                MarathonComponent = __decorate([
                    core_1.Component({
                        selector: 'story-marathon',
                        templateUrl: 'app/marathons/marathon.component.html',
                        styles: ['.mdl-textfield__label {top: 0;}'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [blocks_1.EntityService, blocks_1.ModalService, router_1.RouteParams, router_1.Router, blocks_1.ToastService, marathon_service_1.MarathonService])
                ], MarathonComponent);
                return MarathonComponent;
            }());
            exports_1("MarathonComponent", MarathonComponent);
        }
    }
});
//# sourceMappingURL=marathon.component.js.map