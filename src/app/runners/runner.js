System.register(['./runners.component', './runner.component', './runner-list.component', './runner.service', './sort-runners.pipe'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (runners_component_1_1) {
                exportStar_1(runners_component_1_1);
            },
            function (runner_component_1_1) {
                exportStar_1(runner_component_1_1);
            },
            function (runner_list_component_1_1) {
                exportStar_1(runner_list_component_1_1);
            },
            function (runner_service_1_1) {
                exportStar_1(runner_service_1_1);
            },
            function (sort_runners_pipe_1_1) {
                exportStar_1(sort_runners_pipe_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=runners.js.map