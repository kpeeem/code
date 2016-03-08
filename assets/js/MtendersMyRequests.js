define('MtendersMyRequests', function (tenderMyRequests) { 
        //#Models##########################################################
        console.info('tenderMyRequestsModel-LOADED===============================================');
        RES.Models.tenderMyRequestsModel = Backbone.Model.extend({
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                console.info("init: Model tenderMyRequests");
                this.on('change', function() {});
            },
            url: function() {
                return 'api/tenderMyRequests/' + this.id;
            },
            defaults: function() {
                return {
                        
                };
            }
        });

        //#View###########################################################

        //tenderMyRequestsView
        RES.Views.tenderMyRequestsView = Backbone.View.extend({
            el: "#insert",
            events: {

            },
            initialize: function(options) {
                this.options = options;
                // this.id = options.id;
                // this.el = options.insertTag;    
                this.templateFromUrl = options.template;
                this.model.bind('change', this.render, this);
                this.model.bind("all", this.DebugAllEvent);
                // this.model.fetch(); TODO-front
                this.render();
            },
            DebugAllEvent: function(e) {  
                    console.log("event tenderMyRequests:"+e);
            },
            render: function(options) {
                console.log("render view tenderMyRequests ################");
                console.log(this.model.toJSON());
                console.log("render view tenderMyRequests ################");
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                this.$el.html(html);   
                return this;
            }
        });


        //#Collections#################################################
        // RES.Collections.CollectionsOfModels = Backbone.Collection.extend({
        //     model: RES.Models.tenderMyRequests,
        // });
        console.info('tenderMyRequestsModule-LOADED===============================================');
    return RES

}); //define('companiesModule', function () { 
