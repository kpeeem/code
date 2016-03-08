define('MmanageStaff', function () {
    console.info('manageStaffModule-LOADED===============================================');
    //#Models##########################################################
    RES.Models.manageStaffModel = Backbone.Model.extend({
        url: "/api/", // TODO-front correct api url
        initialize: function () {
            console.info("Model manageStaff init");
            this.on('change', function () {
            });
        },
        defaults: {
             // TODO-front: убрать заглушку
                results: []

        }
    });

    //#View###########################################################
    //authView
    RES.Views.manageStaffView = Backbone.View.extend({
        el: "#insert",
        events: {
            //'click .signin.btn': 'manageStaff'
        },
        initialize: function (options) {
            this.options = options;
            this.templateFromUrl = options.template;
            this.render();
        },

        refresh: function () {

        },
        success: function () {
            //Backbone.history.navigate('companies', true);
        },
        eventDebug: function (e) {
            console.log(e);
            //console.log('redirectToCompany');
        },
        error: function (model, error) { // TODO-front: добавить обработку ошибок
            if (error.status == 401) {
                //console.log('error 401: notAuth' + error);
                //$(".auth-scope .notification").text(error.responseJSON.detail);
            }
            console.log(error);
        },
        render: function (options) {
            console.log("render view manageStaff");
            console.log(this.model.toJSON());
            var data = this.model.toJSON();
            var tmpl = _.template(this.templateFromUrl);
            var html = tmpl(this.model.toJSON());
            var manageAddScope = $(".manageAdd-scope");
            this.$el.append(html);

            return this;
        }
    });

    console.info('manageStaffModule-LOADED===============================================');
    return RES;

}); //define('authModule', function () { 
