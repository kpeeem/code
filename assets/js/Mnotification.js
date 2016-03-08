define('Mnotification', function (notification) { 
    console.info('Mnotification-LOADED===============================================');
    //#Models##########################################################
    RES.Models.notificationModel = Backbone.Model.extend({
        url: "/api/notification/",
        initialize: function() {
            console.info("Model notification init");
            this.on('change', function() {});
        },
        defaults: function() {
            return {
                notification:'Привет из нотификейшена'
            };
        }
    });
    //#View###########################################################
    RES.Views.notificationView = Backbone.View.extend({
            initialize: function(options) {
                this.options = options;
                this.el = options.insertTag;
                this.templateFromUrl = options.template;
                this.render();
                this.model.bind('change', this.render, this);
                this.model.bind("error", this.error);
                this.model.bind("all", this.eventDebug);
                //TODO-front this.model.fetch();
            },
            eventDebug: function(e) {  
                console.log(e);
            },
            error: function(model, error) {
                if (error.status == 401){
                    console.log('error 401: notAuth' + error);
                    $(".forgotPass-scope .notification").text(error.responseJSON.detail);
                }
                console.log(error);
            },          
            render: function(options) {
                console.log("render view notification");
                console.log(this.model.toJSON());
                var data = this.model.toJSON();
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                $(html).insertAfter(this.el);
                return this;
            }
    });
    console.info('Mnotification-FINISH===============================================');
}); //define('Mnotification', function (notification) { 
