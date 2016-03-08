define('MforgotPass', function (forgotPass) { 
    console.info('MforgotPass-LOADED===============================================');
    //#Models##########################################################
    RES.Models.forgotPassModel = Backbone.Model.extend({
        url: "/api/password/reset/",
        initialize: function() {
            console.info("Model forgot init");
            this.on('change', function() {});
        },
        defaults: function() {
            return {
                email:''
            };
        }
    });
    //#View###########################################################
    RES.Views.forgotPassView = Backbone.View.extend({
            el: "#insert",
            email:'',
            template: 'forgotPass',
            events: {
                'click .sendPass.btn': 'sendPass'
            },
            initialize: function(options) {
                this.options = options;
                this.templateFromUrlMain = options.template.main;
                this.templateFromUrlSuccess = options.template.success;
                console.log(this.options);
                this.render(this.options);
    
                this.model.bind("error", this.error);
                this.model.bind("all", this.eventDebug);
                this.model.bind("sync", this.passwordSuccessRender,this);
            },
            sendPass: function() {
                console.log('forgotPass: sendAuth');
                this.email = $('.forgotPass-scope .email').val();
                this.model.set({'email':this.email});
                this.model.save(null,{type: 'POST',});
            },
            eventDebug: function(e) {  
                    console.log(e);
                    //console.log('redirectToCompany');
            },
            error: function(model, error) {
                // console.log(this.model);
                if (error.status == 400){
                    debug.error('error 400: notAuth');
                     var Serror = JSON.parse(error.responseText);
                    $(".forgotPass-scope .notification").text(Serror.email);
                }
            },
            passwordSuccessRender: function(options) {
                console.log("render view forgotPasswordSuccess");
                this.model.set({'email':this.email});
                var data = this.model.toJSON();
                var tmpl = _.template(this.options.template.success);
                var html = tmpl(this.model.toJSON());
                this.$el.html(html);
                $('.forgotPassSuccess-scope #mail').attr('href',"http://" + this.email.replace(/.*@/, ""));
                return this;
            },            
            render: function(options) {
                console.log("render view forgotPass");
                console.log(this.model.toJSON());
                var data = this.model.toJSON();
                var tmpl = _.template(this.templateFromUrlMain);
                var html = tmpl(this.model.toJSON());
                this.$el.html(html);
                return this;
            }
    });
    console.info('MforgotPass-FINISH===============================================');
}); //define('MforgotPass', function (forgotPass) { 
