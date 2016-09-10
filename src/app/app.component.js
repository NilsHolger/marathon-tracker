System.register(['angular2/core', 'angular2/http', 'angular2/router', 'rxjs/Rx', './runners/runners', './dashboard/dashboard', './marathons/marathons', './shared/shared', './blocks/blocks'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, runners_1, dashboard_1, marathons_1, shared_1, blocks_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {},
            function (runners_1_1) {
                runners_1 = runners_1_1;
            },
            function (dashboard_1_1) {
                dashboard_1 = dashboard_1_1;
            },
            function (marathons_1_1) {
                marathons_1 = marathons_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            },
            function (blocks_1_1) {
                blocks_1 = blocks_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_messageService, _modalService) {
                    this._messageService = _messageService;
                    this._modalService = _modalService;
                    this.menuItems = [
                        { caption: 'Dashboard', link: ['Dashboard'] },
                        { caption: 'Runners', link: ['Runners'] },
                        { caption: 'Marathons', link: ['Marathons'] }
                    ];
                }
                AppComponent.prototype.resetDb = function () {
                    var _this = this;
                    var msg = 'Are you sure you want to reset the database?';
                    this._modalService.activate(msg).then(function (responseOK) {
                        if (responseOK) {
                            _this._messageService.resetDb();
                        }
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'marathon-app',
                        templateUrl: 'app/app.component.html',
                        styleUrls: ['app/app.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, blocks_1.ModalComponent, blocks_1.SpinnerComponent, blocks_1.ToastComponent],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            // provide(XHRBackend, { useClass: InMemoryBackendService }),
                            // provide(SEED_DATA, { useClass: InMemoryStoryService }),
                            // provide(InMemoryBackendConfig, { useValue: { delay: 600 } }),
                            router_1.ROUTER_PROVIDERS,
                            runners_1.RunnerService,
                            blocks_1.EntityService,
                            blocks_1.ExceptionService,
                            shared_1.MessageService,
                            blocks_1.ModalService,
                            blocks_1.SpinnerService,
                            blocks_1.ToastService
                        ]
                    }),
                    router_1.RouteConfig([
                        { path: '/dashboard', name: 'Dashboard', component: dashboard_1.DashboardComponent, useAsDefault: true },
                        { path: '/marathons/...', name: 'Marathons', component: marathons_1.MarathonsComponent },
                        { path: '/runners/...', name: 'Runners', component: runners_1.RunnersComponent },
                    ]), 
                    __metadata('design:paramtypes', [shared_1.MessageService, blocks_1.ModalService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map