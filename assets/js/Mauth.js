define('Mauth', function (auth) { 
        console.info('authModule-LOADED===============================================');

        //replaced in Mauth_model
        /*RES.Models.authModel = Backbone.Model.extend({
            url: "/api/auth/",
            initialize: function() {
                console.info("Model auth init");
                this.on('change', function() {});
            },
            defaults: function() {
                return {

                };
            }
        });
*/
        //#View###########################################################
        //authView
        RES.Views.authView = Backbone.View.extend({
            el: "#insert",
            events: {
                'click .signin.btn': 'sendAuth',
                'keydown': 'keyAction'
            },
            initialize: function(options) {
                this.options = options;
                this.templateFromUrl = options.template;
                
                this.model.bind('change', this.render, this);
                this.model.bind("error", this.error);
                this.model.bind("all", this.eventDebug);
                this.model.bind("sync", this.success);
                this.render();
            },
            sendAuth: function() {
                console.log('authView: sendAuth');
                RES.Utils.makeBasicAuth($(".auth-scope .login").val(), $(".auth-scope .password").val());
                this.model.fetch({
                    type: 'POST'
                });
            },
            success: function() {
                Backbone.history.navigate('companies', true);
            },
            eventDebug: function(e) {  
                    console.log(e);
                    console.log(this.model);
            },
            error: function(model, error) {
                if (error.status == 401){
                    console.log('error 401: notAuth' + error);
                    $(".auth-scope .notification").text(error.responseJSON.detail);
                }
                console.log(error);
            },
            keyAction: function(e) {
                var code = e.keyCode || e.which;
                if(code == 13) { 
                    this.sendAuth();
                }
            },
            render: function(options) {
                console.log("render view auth");
                console.log(this.model.toJSON());
                var data = this.model.toJSON();
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                this.$el.html(html);
                return this;
            }
        });

        console.info('authModule-LOADED===============================================');
    return RES

}); //define('authModule', function () { 
