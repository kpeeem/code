/**
 * Created by salik on 22.09.15.
 */
define ("MfileUpload", function () {
    console.info('MfileUpload-LOADED===============================================');
    //#Models##########################################################
    RES.Models.fileUploadModel = Backbone.Model.extend({});
    //#View###########################################################
    RES.Views.fileUploadView = Backbone.View.extend({
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