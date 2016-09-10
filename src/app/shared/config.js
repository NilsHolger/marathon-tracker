System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CONFIG;
    return {
        setters:[],
        execute: function() {
            exports_1("CONFIG", CONFIG = {
                baseUrls: {
                    config: 'commands/config',
                    resetDb: 'commands/resetDb',
                    runners: 'api/runners.json',
                    marathons: 'api/marathons.json'
                }
            });
        }
    }
});
//# sourceMappingURL=config.js.map