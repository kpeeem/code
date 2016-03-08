define('Mslider', function (slider) { 
    console.info('Mslider-LOADED===============================================');
    //#Models##########################################################
    RES.Models.sliderModel = Backbone.Model.extend({
        url: "/api/slider/",
        initialize: function() {
            console.info("Model slider init");
            this.on('change', function() {});
        },
        defaults: function() {
            return {
                slides:{
                    [
                        'pk':1,
                        'name':'Тендер раз',
                        'title':'На поставку жирных котов',
                        'categories':[
                            {
                                'name':'Жир',
                                'pk':1
                            },
                            {
                                'name':'Ссыт в тапки',
                                'pk':2
                            },                        
                            {
                                'name':'категория3',
                                'pk':3
                            }]
                        ,
                        'date':'Заявки принимаются до 9.9.2019',
                        'image':'http://data3.whicdn.com/images/62449279/large.gif'
                    ],
                    [
                        'pk':2,
                        'name':'Тендер два',
                       'title':'На поставку круглых котов',
                        'categories':[
                            {
                                'name':'категория1',
                                'pk':1
                            },
                            {
                                'name':'категория2',
                                'pk':2
                            },                        
                            {
                                'name':'категория3',
                                'pk':3
                            }]
                        ,
                        'date':'Заявки принимаются до 12.12.2112',
                        'image':'http://lorempixel.com/1000/500/cats/'
                    ],
                    [
                        'pk':3,
                        'name':'Тендер три',
                        'title':'На поставку пухлых котов',
                        'categories':[
                            {
                                'name':'категория1',
                                'pk':1
                            },
                            {
                                'name':'категория2',
                                'pk':2
                            },                        
                            {
                                'name':'категория3',
                                'pk':3
                            }]
                        ,
                        'date':'Заявки принимаются до  12.12.2029',
                        'image':'http://www.coolanimalworld.com/gallery/var/albums/Funny-fat-cats-who-do-not-love-sports/Funny%20fat%20cats%20who%20do%20not%20love%20sports%20(01).jpg'
                    ]
                }
            };
        }
    });
    //#View###########################################################
    RES.Views.sliderView = Backbone.View.extend({
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
                console.log(error);
            },          
            render: function(options) {
                console.log("render view slider");
                console.log(this.model.toJSON());
                var data = this.model.toJSON();
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                $(html).insertAfter(this.el);
                $('.slider').slick({
                      dots: true,
                      infinite: true,
                      speed: 300,
                      slidesToShow: 1,
                      adaptiveHeight: true,
                      arrows: false
                });
                return this;
            }
    });
    console.info('Mslider-FINISH===============================================');
}); //define('Mslider', function (slider) { 
