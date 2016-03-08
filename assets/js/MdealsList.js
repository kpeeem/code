define('MdealsList', function (auth) {
        console.info('dealsListModule-LOADED===============================================');
        //#Models##########################################################
        RES.Models.dealsListModel = Backbone.Model.extend({
            url: "/api/auth/",
            initialize: function() {
                console.info("Model dealsList init");
                this.on('change', function() {});
            },
            defaults: function() {
                return {

                };
            }
        });

        //#View###########################################################
        //authView
        RES.Views.dealsListView = Backbone.View.extend({
            el: "#insert",
            events: {
                'click .signin.btn': 'senddealsList'
            },
            initialize: function(options) {
                this.options = options;
                this.templateFromUrl = options.template;
                this.render();
                this.stopLoader();
            },
            senddealsList: function() {
                console.log('dealsListView: senddealsList');
                RES.Utils.makeBasicAuth($(".auth-scope .login").val(), $(".auth-scope .password").val());
                this.model.fetch({
                    type: 'POST'
                });
            },
            refresh: function() {

            },
            success: function() {
                Backbone.history.navigate('companies', true);
            },
            eventDebug: function(e) {
                    console.log(e);
                    //console.log('redirectToCompany');
            },
            error: function(model, error) {
                if (error.status == 401){
                    console.log('error 401: notAuth' + error);
                    $(".auth-scope .notification").text(error.responseJSON.detail);
                }
                console.log(error);
            },
            render: function(options) {
                console.log("render view auth");
                console.log(this.model.toJSON());
                var data = this.model.toJSON();
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                // console.log(html);
                this.$el.html(html);
                return this;
            },
        });

        console.info('dealsListModule-LOADED===============================================');
    return RES

}); //define('authModule', function () { 
