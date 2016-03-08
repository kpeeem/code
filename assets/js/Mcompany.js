define('Mcompany', function (compan) { 
        //#Models##########################################################
        console.info('companyModule-LOADED===============================================');
        RES.Models.companyModel = Backbone.Model.extend({
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                console.info("init: Model companies");
                this.on('change', function() {});
            },
            url: function() {
                return 'api/company/' + this.id;
            },
            defaults: function() {
                return {
                    'achievements':{
                        'first':{
                            'description':'Подтверждённая компания, готовая работать внутри системы RES и проводить сделки, рассчитываясь',
                            'active':true
                        },
                        'second':{
                            'description':'Подтверждённая компания, готовая работать внутри системы RES и проводить сделки, рассчитываясь'
                        },
                        'third':{
                            'description':'Подтверждённая компания, готовая работать внутри системы RES и проводить сделки, рассчитываясь',
                            'active':true
                        },
                        'forth':{
                            'description':'Подтверждённая компания, готовая работать внутри системы RES и проводить сделки, рассчитываясь'
                        },
                        'five':{
                            'description':'Подтверждённая компания, готовая работать внутри системы RES и проводить сделки, рассчитываясь'
                        },
                    }
                };
            }
        });

        //#View###########################################################

        //companyView
        RES.Views.companyView = Backbone.View.extend({
            el: "#insert",
            events: {

            },
            initialize: function(options) {
                // this.render();
                this.options = options;
                this.id = options.id;
                this.templateFromUrl = options.template;
                this.model.bind('change', this.render, this);
                // this.model.bind("error", this.error);
                this.model.bind("all", this.DebugAllEvent);
                this.model.fetch();
            },

            DebugAllEvent: function(e) {  
                    console.log("event viewCompanies:"+e);
            },
            error: function(model, error) {
                    console.log("error viewCompanies:"+error.responseJSON);
            },
            render: function(options) {
                console.log("render view company ################");
                console.log(this.model.toJSON());
                console.log("render view company ################");
                var data = this.model.toJSON();
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                this.$el.html(html);            
                RES.Modules.Slider({insertTag:'.company-scope'});
                return this;
            }
        });
        //companyView
        RES.Views.companyViewEdit = Backbone.View.extend({
            el: "#insert",
            events: {
                
            },
            initialize: function(options) {
                // this.render();
                this.options = options;
                this.id = options.id;
                this.templateFromUrl = options.template;
                this.model.bind('change', this.render, this);
                this.model.bind("error", this.error);
                this.model.bind("all", this.allEvent);
                this.model.fetch();
                this.render();
                return this;
            },
            
            save: function() {
                this.model.save();
            },

            allEvent: function(e) {  
                    console.log("event viewCompanies:"+e);
            },
            error: function(model, error) {
                    console.log("error viewCompanies:"+error.responseJSON.detail);
            },
            render: function(options) {
                console.log("render view companyEdit ################");
                console.log(this.model.toJSON());
                console.log("render view companyEdit ################");
                var data = this.model.toJSON();
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                this.$el.html(html);

                // return this;
            }
        });

        //#Collections#################################################
        // RES.Collections.CollectionsOfModels = Backbone.Collection.extend({
        //     model: RES.Models.company,
         
        //     url: "/api/company/"
        // });
        console.info('companyModule-LOADED===============================================');
    return RES

}); //define('companiesModule', function () { 
