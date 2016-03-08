define('MtenderCreate', function (tenderCreate) { 
        //#Models##########################################################
        console.info('tenderCreateModel-LOADED===============================================');
        RES.Models.tenderCreateModel = Backbone.Model.extend({
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                console.info("init: Model tenderCreate");
                this.on('change', function() {});
            },
            url: function() {
                return 'api/tenderCreate/' + this.id;
            },
            defaults: function() {
                return {
                    'createTender':{
                        'name':'назввние',
                        'description':'описание',
                        'categories':[
                            {
                                'name':'Авто',
                                'pk':1,
                                'icon':'res-category_24_building'
                            },
                            {
                                'name':'Услуги',
                                'pk':2,
                                'icon':'res-category_24_car'
                            }],                          
                        'imagesCover':[
                            {
                                'image':'/static/images/tmp/tender_images/01.png',
                                'id':'1'
                            },
                            {
                                'image':'/static/images/tmp/tender_images/02.png',
                                'id':'2'
                            },
                            {
                                'image':'/static/images/tmp/tender_images/03.png',
                                'id':'3'
                            },
                            {
                                'image':'/static/images/tmp/tender_images/04.png',
                                'id':'4'
                            }
                        ],
                        'maxPrice':'200000',
                        'dateEndRecieveRequests':'11.11.11',
                        'timeEndRecieveRequests':'00:00',
                        'dateDeadlineTender':'11.11.11',
                        'timeDeadlineTender':'00:00',
                        'imagesProduct':[
                            {
                                'image':'/static/images/tmp/tender_images/01.png',
                                'id':'1'
                            },
                            {
                                'image':'/static/images/tmp/tender_images/02.png',
                                'id':'2'
                            },
                            {
                                'image':'/static/images/tmp/tender_images/03.png',
                                'id':'3'
                            },
                            {
                                'image':'/static/images/tmp/tender_images/04.png',
                                'id':'4'
                            }
                        ],
                        'openDiscuss':true,
                        'requestsVisibility':false,
                        'winnerVisibility':false,
                        'unregistredVisibility':true,
                    }
                };
            }
        });

        //#View###########################################################

        //tenderCreateView
        RES.Views.tenderCreateView = Backbone.View.extend({
            el: "#insert",
            events: {

            },
            initialize: function(options) {
                this.options = options;
                // this.id = options.id;
                // this.el = options.insertTag;    
                this.templateFromUrl = options.template;
                this.model.bind('change', this.render, this);
                // this.model.bind("error", this.error);
                this.model.bind("all", this.DebugAllEvent);
                // this.model.fetch(); TODO-front
                this.render();
            },
            DebugAllEvent: function(e) {  
                    console.log("event viewCompanies:"+e);
            },
            error: function(model, error) {
                    console.log("error viewCompanies:"+error.responseJSON);
            },
            render: function(options) {
                console.log("render view tenderCreate ################");
                console.log(this.model.toJSON());
                console.log("render view tenderCreate ################");
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                this.$el.html(html);   
                $('.tenderCreate-scope .slider').slick({
                      dots: false,
                      infinite: true,
                      speed: 300,
                      slidesToShow: 2,
                      adaptiveHeight: true,
                });
                $('.tenderCreate-scope .slider .img').click(function(){
                    $(this).siblings().removeClass('myCard');
                    $(this).addClass('myCard');
                })
                RES.Utils.datePicker($('.tenderCreate-scope .datepicker'));
                RES.Utils.dropDown();
                return this;
            }
        });


        //#Collections#################################################
        // RES.Collections.CollectionsOfModels = Backbone.Collection.extend({
        //     model: RES.Models.tenderCreate,
        // });
        console.info('tenderCreateModule-LOADED===============================================');
    return RES

}); //define('companiesModule', function () { 
