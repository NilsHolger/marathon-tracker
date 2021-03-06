System.register(['angular2/core', 'angular2/router', './runner.service', './sort-runners.pipe', '../blocks/blocks'], function(exports_1, context_1) {
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
    var core_1, router_1, runner_service_1, sort_runners_pipe_1, blocks_1;
    var RunnerListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (runner_service_1_1) {
                runner_service_1 = runner_service_1_1;
            },
            function (sort_runners_pipe_1_1) {
                sort_runners_pipe_1 = sort_runners_pipe_1_1;
            },
            function (blocks_1_1) {
                blocks_1 = blocks_1_1;
            }],
        execute: function() {
            RunnerListComponent = (function () {
                function RunnerListComponent(_runnerService, _filterService) {
                    this._runnerService = _runnerService;
                    this._filterService = _filterService;
                    this.filteredRunners = this.runners;
                }
                RunnerListComponent.prototype.filterChanged = function (searchText) {
                    this.filteredRunners = this._filterService.filter(searchText, ['id', 'name', 'side'], this.runners);
                };
                RunnerListComponent.prototype.getRunners = function () {
                    var _this = this;
                    this.runners = [];
                    this._runnerService.getRunners()
                        .subscribe(function (runners) {
                        _this.runners = _this.filteredRunners = runners;
                        _this.filterComponent.clear();
                    });
                };
                RunnerListComponent.prototype.ngOnDestroy = function () {
                    this._dbResetSubscription.unsubscribe();
                };
                RunnerListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    componentHandler.upgradeDom();
                    this.getRunners();
                    this._dbResetSubscription = this._runnerService.onDbReset
                        .subscribe(function () { return _this.getRunners(); });
                };
                __decorate([
                    core_1.ViewChild(blocks_1.FilterTextComponent), 
                    __metadata('design:type', blocks_1.FilterTextComponent)
                ], RunnerListComponent.prototype, "filterComponent", void 0);
                RunnerListComponent = __decorate([
                    core_1.Component({
                        selector: 'story-runners',
                        templateUrl: './app/runners/runner-list.component.html',
                        directives: [blocks_1.FilterTextComponent, router_1.ROUTER_DIRECTIVES],
                        styleUrls: ['./app/runners/runner-list.component.css'],
                        pipes: [sort_runners_pipe_1.SortRunnersPipe],
                        providers: [blocks_1.FilterService]
                    }), 
                    __metadata('design:paramtypes', [runner_service_1.RunnerService, blocks_1.FilterService])
                ], RunnerListComponent);
                return RunnerListComponent;
            }());
            exports_1("RunnerListComponent", RunnerListComponent);
        }
    }
});
//# sourceMappingURL=runner-list.component.js.map