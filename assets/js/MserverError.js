define ("MserverError", function () {
    console.info('MserverError-LOADED===============================================');
    //#Models##########################################################
    RES.Models.serverErrorModel = Backbone.Model.extend({});
    //#View###########################################################
    RES.Views.serverErrorView = Backbone.View.extend({
        initialize: function (options) {
            this.options = options;
            this.templateFromUrl = options.template;
            this.render();
        },
        render: function (options) {
            console.log(options);
            var tmpl = _.template(this.templateFromUrl);
            $("#insert").html(tmpl);
            return this;
        }
    });
});