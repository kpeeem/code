define('MmanageRoles', function () {
        console.info('manageRolesModule-LOADED===============================================');
        //#Models##########################################################
        RES.Models.manageRolesModel = Backbone.Model.extend({
            url: "/api/", // TODO-front correct api url
            initialize: function() {
                console.info("Model manageRoles init");
                this.on('change', function() {});
            },
            defaults: {
                    results:[

                    ]
            }
        });

        //#View###########################################################
        //authView
        RES.Views.manageRolesView = Backbone.View.extend({
            el: "#insert",
            events: {
                //'click .signin.btn': 'manageRoles'
            },
            initialize: function(options) {
                this.options = options;
                this.templateFromUrlAdd = options.template.add;
                this.templateFromUrlRoles = options.template.roles;
                this.render();
            },

            refresh: function() {

            },
            success: function() {
                //Backbone.history.navigate('companies', true);
            },
            eventDebug: function(e) {
                    console.log(e);
                    //console.log('redirectToCompany');
            },
            error: function(model, error) {
                if (error.status == 401){
                    //console.log('error 401: notAuth' + error);
                    //$(".auth-scope .notification").text(error.responseJSON.detail);
                }
                console.log(error);
            },
            renderAdd: function(options) {
                console.log("render view manageRoles");
                console.log(this.model, this.model.toJSON());
                var data = this.model.toJSON();
                var tmpl = _.template(this.templateFromUrlAdd);
                var html = tmpl(this.model.toJSON());
                $(html).appendTo(this.el);
                RES.Utils.dropDown();
                return this;
            },
            renderRoles: function(options) {
                console.log("render view manageRoles");
                console.log(this.model.toJSON());
                var data = this.model.toJSON();
                var tmpl = _.template(this.templateFromUrlRoles);
                var html = tmpl(this.model.toJSON());
                $(html).appendTo(this.el);
                return this;
            },
            render: function(options) {
                this.renderAdd();
                this.renderRoles();
                return this;
            },
        });

        console.info('imanageRolesModule-LOADED===============================================');
    return RES;

}); //define('authModule', function () { 
