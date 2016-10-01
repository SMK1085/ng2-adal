System.register(['./adal-config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var adal_config_1;
    return {
        setters:[
            function (adal_config_1_1) {
                adal_config_1 = adal_config_1_1;
            }],
        execute: function() {
            describe('AdalConfig', function () {
                it('has loginResource', function () {
                    var config = new adal_config_1.AdalConfig();
                    config.loginResource = 'defaultResource';
                    expect(config.loginResource).toBe('defaultResource');
                });
                it('has clientId', function () {
                    var config = new adal_config_1.AdalConfig();
                    config.clientId = 'e9a5a8b6-8af7-4719-9821-0deef255f68e';
                    expect(config.clientId).toBe('e9a5a8b6-8af7-4719-9821-0deef255f68e');
                });
            });
        }
    }
});
//# sourceMappingURL=adal-config.spec.js.map