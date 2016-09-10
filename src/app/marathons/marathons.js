System.register(['./marathon.component', './marathon.service', './marathon-list.component', './marathons.component'], function(exports_1, context_1) {
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
            function (marathon_component_1_1) {
                exportStar_1(marathon_component_1_1);
            },
            function (marathon_service_1_1) {
                exportStar_1(marathon_service_1_1);
            },
            function (marathon_list_component_1_1) {
                exportStar_1(marathon_list_component_1_1);
            },
            function (marathons_component_1_1) {
                exportStar_1(marathons_component_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=marathons.js.map