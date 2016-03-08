define ("MnotFound", function () {
    console.info('MnotFound-LOADED===============================================');
    //#Models##########################################################
    RES.Models.notFoundModel = Backbone.Model.extend({});
    //#View###########################################################
    RES.Views.notFoundView = Backbone.View.extend({
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