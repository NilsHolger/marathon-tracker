System.register(['angular2/core', 'angular2/router', './marathon-list.component', './marathon.component', './marathon.service'], function(exports_1, context_1) {
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
    var core_1, router_1, marathon_list_component_1, marathon_component_1, marathon_service_1;
    var MarathonsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (marathon_list_component_1_1) {
                marathon_list_component_1 = marathon_list_component_1_1;
            },
            function (marathon_component_1_1) {
                marathon_component_1 = marathon_component_1_1;
            },
            function (marathon_service_1_1) {
                marathon_service_1 = marathon_service_1_1;
            }],
        execute: function() {
            MarathonsComponent = (function () {
                function MarathonsComponent() {
                }
                MarathonsComponent = __decorate([
                    core_1.Component({
                        selector: 'story-marathons-root',
                        template: "\n    <router-outlet></router-outlet>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [marathon_service_1.MarathonService]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Marathons', component: marathon_list_component_1.MarathonListComponent, useAsDefault: true },
                        { path: '/list/:id', name: 'Marathons', component: marathon_list_component_1.MarathonListComponent },
                        { path: '/:id', name: 'Marathon', component: marathon_component_1.MarathonComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], MarathonsComponent);
                return MarathonsComponent;
            }());
            exports_1("MarathonsComponent", MarathonsComponent);
        }
    }
});
//# sourceMappingURL=marathons.component.js.map