define('MtendersMy', function (tendersMy) { 
        //#Models##########################################################
        console.info('tendersMyModel-LOADED===============================================');
        RES.Models.tendersMyModel = Backbone.Model.extend({
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                console.info("init: Model tendersMy");
                this.on('change', function() {});
            },
            url: function() {
                return 'api/tendersMy/' + this.id;
            },
            defaults: function() {
                return {
                        
                };
            }
        });

        //#View###########################################################

        //tendersMyView
        RES.Views.tendersMyView = Backbone.View.extend({
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
                    console.log("event tendersMy:"+e);
            },
            render: function(options) {
                console.log("render view tendersMy ################");
                console.log(this.model.toJSON());
                console.log("render view tendersMy ################");
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                this.$el.html(html);   
                return this;
            }
        });


        //#Collections#################################################
        // RES.Collections.CollectionsOfModels = Backbone.Collection.extend({
        //     model: RES.Models.tendersMy,
        // });
        console.info('tendersMyModule-LOADED===============================================');
    return RES

}); //define('companiesModule', function () { 
