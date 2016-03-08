define('Mtenders', function (tenders) { 
        //#Models##########################################################
        console.info('tendersModule-LOADED===============================================');

        RES.Models.tendersModel = Backbone.Model.extend({
            url: "/api/tenders/",
            initialize: function() {
                console.info("init: Model tenders");
                this.on('change', function() {});
            },
            defaults: function() {
                return {
                    'tenders':[
                        {
                            'pk':1,
                            'name':'Тендер раз',
                            'title':'На поставку жирных котов',
                            'categories':[
                                {
                                    'name':'Жир',
                                    'icon':'res-category_24_advertising'
                                },
                                {
                                    'name':'Ссыт в тапки',
                                    'icon':'res-category_24_cleaning'
                                },                        
                                {
                                    'name':'категория3',
                                    'icon':'res-category_24_education'
                                }]
                            ,
                            'maxPrice':'250 000 000',
                            'dateRequestDeadline':' 9.9.2009',
                            'dateDeadline':' 9.9.2019',
                            'image':'/static/images/tmp/tender_images/06.png'
                        },
                        {
                            'pk':2,
                            'name':'Тендер два',
                           'title':'На поставку круглых котов',
                            'categories':[
                                {
                                    'name':'категория1',
                                    'icon':'res-category_24_health'
                                },
                                {
                                    'name':'категория2',
                                    'icon':'res-category_24_it'
                                },                        
                                {
                                    'name':'категория3',
                                    'icon':'res-category_24_party'
                                }]
                            ,
                            'maxPrice':'50 000 000',
                            'dateRequestDeadline':'12.12.2102',
                            'dateDeadline':'12.12.2112',
                            'image':'/static/images/tmp/tender_images/08.png'
                        },
                        {
                            'pk':3,
                            'name':'Тендер три',
                            'title':'На поставку пухлых котов',
                            'categories':[
                                {
                                    'name':'категория1',
                                    'icon':'res-category_24_rent'
                                },
                                {
                                    'name':'категория2',
                                    'icon':'res-category_24_sport'
                                },                        
                                {
                                    'name':'категория3',
                                    'icon':'res-category_48_building'
                                }]
                            ,
                            'maxPrice':'50 000 000',
                            'dateRequestDeadline':'12.12.2019',
                            'dateDeadline':'12.12.2019',
                            'image':'/static/images/tmp/tender_images/16.png'
                        }
                    ]
                };
            }
        });

        //#View###########################################################

        //tendersView
        RES.Views.tendersView = Backbone.View.extend({
            el: "#insert",
            initialize: function(options) {
                this.options = options;
                this.templateFromUrl = options.template;
                this.model.bind('change', this.render, this);
                this.model.bind("error", this.error);
                this.model.bind("all", this.allEventDebug);
                this.render();
                // this.model.fetch(); TODO-front
            },
            allEventDebug: function(e) {  
                    console.log("event viewtenders:"+e);
                    //console.log('redirectToCompany');
            },
            error: function(model, error) {
                    console.log("error viewtenders:"+error.responseJSON.detail);
            },
            render: function(options) {
                console.log("render view tenders ################");
                console.log(this.model.toJSON());
                console.log("render view tenders ################");
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                //console.log(this.model.toJSON());
                this.$el.html(html);
                return this;
            }
        });

        //#Collections#################################################
        // RES.Collections.CollectionsOfModels = Backbone.Collection.extend({
        //     model: RES.Models.tenders,
        //     url: "/api/tenders/"
        // });
        console.info('tendersModule-LOADED===============================================');
    return RES

}); //define('tendersModule', function () { 
