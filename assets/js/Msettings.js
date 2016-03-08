define('Msettings', function (settings) {
    //#Models##########################################################
    console.info('settingsModel-LOADED===============================================');
    RES.Models.settingsModel = Backbone.Model.extend({
        initialize: function (options) {
            this.options = options;
            this.id = options.id;
            console.info("init: Model settings");
            this.on('change', function () {
            });
        },
        url: function () {
            return 'api/settings/' + this.id;
        },
        defaults: function () {
            return {};
        }
    });

    //#View###########################################################

    //settingsView
    RES.Views.settingsView = Backbone.View.extend({
        el: "#insert",
        events: {},
        initialize: function (options) {
            this.options = options;
            // this.id = options.id;
            // this.el = options.insertTag;
            this.templateFromUrl = options.template;
            this.model.bind('change', this.render, this);
            // this.model.bind("error", this.error);
            this.model.bind("all", this.DebugAllEvent);
            // this.model.fetch(); TODO-front
            this.render();
        },
        error: function (model, error) {
            console.log("error viewCompanies:" + error.responseJSON);
        },
        render: function (options) {
            var tmpl = _.template(this.templateFromUrl);
            var html = tmpl(this.model.toJSON());
            this.$el.html(html);
            RES.Utils.setAcitveUrl($('.settings-scope .menuline li a'));
            return this;
        }
    });


    //#Collections#################################################
    // RES.Collections.CollectionsOfModels = Backbone.Collection.extend({
    //     model: RES.Models.settings,
    console.info('settingsModule-LOADED===============================================');
    return RES

}); //define('companiesModule', function () { 










