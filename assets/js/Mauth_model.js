define('Mauth_model', ['init', 'helpers'], function (auth) {
    RES.Models.authModel = Backbone.Model.extend({
        url: "/api/auth/",
        initialize: function () {
            console.info("Model auth init");
            this.on('change', function () {
            });
        },
        defaults: function () {
            return {};
        }
    });
});