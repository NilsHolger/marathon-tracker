System.register(['angular2/core', 'angular2/router', '../blocks/blocks', '../runners/runner.service'], function(exports_1, context_1) {
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
    var core_1, router_1, blocks_1, runner_service_1;
    var RunnerComponent;
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
            function (runner_service_1_1) {
                runner_service_1 = runner_service_1_1;
            }],
        execute: function() {
            RunnerComponent = (function () {
                function RunnerComponent(_runnerService, _entityService, _modalService, _routeParams, _router, _toastService) {
                    this._runnerService = _runnerService;
                    this._entityService = _entityService;
                    this._modalService = _modalService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._toastService = _toastService;
                    this.editRunner = {};
                }
                RunnerComponent.prototype.cancel = function (showToast) {
                    if (showToast === void 0) { showToast = true; }
                    this.editRunner = this._entityService.clone(this.runner);
                    if (showToast) {
                        this._toastService.activate("Cancelled changes to " + this.runner.name);
                    }
                };
                RunnerComponent.prototype.delete = function () {
                    var _this = this;
                    var msg = "Do you want to delete " + this.runner.name + "?";
                    this._modalService.activate(msg).then(function (responseOK) {
                        if (responseOK) {
                            _this.cancel(false);
                            _this._runnerService.deleteRunner(_this.runner)
                                .subscribe(function () {
                                _this._toastService.activate("Deleted " + _this.runner.name);
                                _this._gotoRunners();
                            });
                        }
                    });
                };
                RunnerComponent.prototype.isAddMode = function () {
                    var id = +this._routeParams.get('id');
                    return isNaN(id);
                };
                RunnerComponent.prototype.ngOnDestroy = function () {
                    this._dbResetSubscription.unsubscribe();
                };
                RunnerComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    componentHandler.upgradeDom();
                    this._getRunner();
                    this._dbResetSubscription = this._runnerService.onDbReset
                        .subscribe(function () { return _this._getRunner(); });
                };
                RunnerComponent.prototype.routerCanDeactivate = function (next, prev) {
                    return !this.runner ||
                        !this._isDirty() ||
                        this._modalService.activate();
                };
                RunnerComponent.prototype.save = function () {
                    var _this = this;
                    var runner = this.runner = this._entityService.merge(this.runner, this.editRunner);
                    if (runner.id == null) {
                        this._runnerService.addRunner(runner)
                            .subscribe(function (char) {
                            _this._setEditRunner(char);
                            _this._toastService.activate("Successfully added " + char.name);
                            _this._gotoRunners();
                        });
                        return;
                    }
                    this._runnerService.updateRunner(runner)
                        .subscribe(function () { return _this._toastService.activate("Successfully saved " + runner.name); });
                };
                RunnerComponent.prototype._getRunner = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    if (id === 0)
                        return;
                    if (this.isAddMode()) {
                        this.runner = { name: '', side: 'dark' };
                        this.editRunner = this._entityService.clone(this.runner);
                        return;
                    }
                    this._runnerService.getRunners().subscribe(function (runner) {
                        for (var i = 0; i < runner.length; i++) {
                            if (runner[i].id === id) {
                                _this._setEditRunner(runner[i]);
                            }
                        }
                    });
                    var runners = this._runnerService.getRunners()
                        .subscribe(function (runners) {
                        _this.runners = runners;
                    });
                };
                RunnerComponent.prototype._gotoRunners = function () {
                    var id = this.runner ? this.runner.id : null;
                    var route = ['Runners', { id: id }];
                    this._router.navigate(route);
                };
                RunnerComponent.prototype._handleServiceError = function (op, err) {
                    console.error(op + " error: " + (err.message || err));
                };
                RunnerComponent.prototype._isDirty = function () {
                    return this._entityService.propertiesDiffer(this.runner, this.editRunner);
                };
                RunnerComponent.prototype._setEditRunner = function (runner) {
                    if (runner) {
                        this.runner = runner;
                        this.editRunner = this._entityService.clone(this.runner);
                    }
                    else {
                        this._gotoRunners();
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], RunnerComponent.prototype, "runner", void 0);
                RunnerComponent = __decorate([
                    core_1.Component({
                        selector: 'story-runner',
                        templateUrl: 'app/runners/runner.component.html',
                        styles: ['.mdl-textfield__label {top: 0;}'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [runner_service_1.RunnerService, blocks_1.EntityService, blocks_1.ModalService, router_1.RouteParams, router_1.Router, blocks_1.ToastService])
                ], RunnerComponent);
                return RunnerComponent;
            }());
            exports_1("RunnerComponent", RunnerComponent);
        }
    }
});
//# sourceMappingURL=runner.component.js.map