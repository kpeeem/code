define('Mtender', function (tenderCard) { 
        //#Models##########################################################
        console.info('tenderCardModel-LOADED===============================================');
        RES.Models.tenderCardModel = Backbone.Model.extend({
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                console.info("init: Model tenderCard");
                this.on('change', function() {});
            },
            url: function() {
                return 'api/tenderCard/' + this.id;
            },
            defaults: function() {
                return {
                        'pk':1,
                        'name':'Тендер раз',
                        'title':'на поставку автомобилей мицубиси',
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
                        'status':'Открыт. Идет прием заявок',
                        'image':'/static/images/tmp/tender_images/02.png',
                        'companyAutor':'ООО Спец-Деливер',
                        'maxPrice':'250 000 000 РЕС',
                        'offersDateEnd':'11.11.11 11:11',
                        'tenderDateEnd':'11.11.11 11:11',
                        'dealDateEnd':'11.11.11 11:11',
                        'description':' Служба Яндекс.Рефераты предназначена для студентов и школьников, дизайнеров и журналистов, создателей научных заявок и отчетов — для всех, кто относится к тексту, как к количеству знаков.Нажав на кнопку «Написать реферат», вы лично создаете уникальный текст, причем именно от вашего нажатия на кнопку зависит, какой именно текст получится — таким образом, авторские права на реферат принадлежат только вам. Теперь никто не сможет обвинить вас в плагиате, ибо каждый текст Яндекс.Рефератов неповторим. Текстами рефератов можно пользоваться совершенно бесплатно, ссылка на Яндекс.Рефераты обязательна.',
                        'images':[
                            {
                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                'image':'/static/images/tmp/tender_images/02.png'
                            },
                            {
                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                'image':'/static/images/tmp/tender_images/02.png'
                            },
                            {
                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                'image':'/static/images/tmp/tender_images/02.png'
                            },
                            {
                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                'image':'/static/images/tmp/tender_images/02.png'
                            }]
                };
            }
        });

        console.info('tenderSelectWinnersModel-LOADED===============================================');
        RES.Models.tenderSelectWinnersModel = Backbone.Model.extend({
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                console.info("init: Model tenderSelectWinners");
                this.on('change', function() {});
            },
            url: function() {
                return 'api/tenderSelectWinners/' + this.id;
            },
            defaults: function() {
                return {
                    'tenderSelectWinners':{
                        'date':'11.22.1988',
                        'requests':
                                [
                                    {
                                        'id':1,
                                        'name':'ООО "Рога и копытце 11.11.11 11:11',
                                        'price':'888 888 888,00',
                                        'deadline':'11.22.2012',
                                        'comment':'бла-бал-бла-бал-бла-бал-бла-бал-бла-бал-бла-бал-бла-бал-бла-бал',
                                        'images':[
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            }
                                        ]
                                    },
                                    {
                                        'id':2,
                                        'name':'ООО "Рога и копытце 11.11.11 11:11',
                                        'price':'888 888 888,00',
                                        'deadline':'11.22.2012',
                                        'comment':'бла-бал-бла-бал-бла-бал-бла-бал-бла-бал-бла-бал-бла-бал-бла-бал',
                                        'images':null
                                    },
                                    {
                                        'id':3,
                                        'name':'ООО "Рога и копытце 11.11.11 11:11',
                                        'price':'888 888 888,00',
                                        'deadline':'11.22.2012',
                                        'comment':null,
                                        'images':[
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            }
                                        ]
                                    },
                                    {
                                        'id':4,
                                        'name':'ООО "Рога и копытце 11.11.11 11:11',
                                        'price':'888 888 888,00',
                                        'deadline':'11.22.2012',
                                        'comment':null,
                                        'images':[
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            }
                                        ]
                                    },
                                    {
                                        'id':5,
                                        'name':'ООО "Рога и копытце 11.11.11 11:11',
                                        'price':'888 888 888,00',
                                        'deadline':'11.22.2012',
                                        'comment':'бла-бал-бла-бал-бла-бал-бла-бал-бла-бал-бла-бал-бла-бал-бла-бал',
                                        'images':[
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            }
                                        ]
                                    },
                                    {
                                        'id':6,
                                        'name':'ООО "Рога и копытце 11.11.11 11:11',
                                        'price':'888 888 888,00',
                                        'deadline':'11.22.2012',
                                        'comment':null
                                    }
                                ]
                        } 
                };
            }
        });

        console.info('tenderSendRequestsModel-LOADED===============================================');
        RES.Models.tenderSendRequestsModel = Backbone.Model.extend({
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                console.info("init: Model tenderSendRequestsModel");
                this.on('change', function() {});
            },
            url: function() {
                return 'api/tenderSendRequestsModel/' + this.id;
            },
            defaults: function() {
                return {
                    'tenderSendRequests':{
                        'date':'11.22.1988',
                        'dateEnd':'11.22.1988',
                        'winner':{
                            'id':1,
                            'name':'ООО "Рога и копытце 11.11.11 11:11',
                            'price':'888 888 888,00',
                            'deadline':'11.22.2012',
                        },
                        'requests':
                                [
                                    {
                                        'id':1,
                                        'name':'ООО "Рога и копытце 11.11.11 11:11',
                                        'price':'888 888 888,00',
                                        'deadline':'11.22.2012',
                                        'images':[
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            }
                                        ]
                                    },
                                    {
                                        'id':2,
                                        'name':'ООО "Рога и копытце 11.11.11 11:11',
                                        'price':'888 888 888,00',
                                        'deadline':'11.22.2012',
                                        'comment':'бла-бал-бла-бал-бла-бал-бла-бал-бла-бал-бла-бал-бла-бал-бла-бал',
                                        'images':null
                                    },
                                    {
                                        'id':3,
                                        'name':'ООО "Рога и копытце 11.11.11 11:11',
                                        'price':'888 888 888,00',
                                        'deadline':'11.22.2012',
                                        'images':[
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            }
                                        ]
                                    },
                                    {
                                        'id':4,
                                        'name':'ООО "Рога и копытце 11.11.11 11:11',
                                        'price':'888 888 888,00',
                                        'deadline':'11.22.2012',
                                        'images':[
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            }
                                        ]
                                    },
                                    {
                                        'id':5,
                                        'name':'ООО "Рога и копытце 11.11.11 11:11',
                                        'price':'888 888 888,00',
                                        'deadline':'11.22.2012',
                                        'images':[
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            },
                                            {
                                                'thumbImage200x200':'/static/images/tmp/tender_images/02.png',
                                                'image':'/static/images/tmp/tender_images/02.png'
                                            }
                                        ]
                                    },
                                    {
                                        'id':6,
                                        'name':'ООО "Рога и копытце 11.11.11 11:11',
                                        'price':'888 888 888,00',
                                        'deadline':'11.22.2012'
                                    }
                                ]
                        } 
                };
            }
        });

        console.info('tenderRequestApplyModel-LOADED===============================================');
        RES.Models.tenderRequestApplyModel = Backbone.Model.extend({
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                console.info("init: Model tenderRequestApply");
                this.on('change', function() {});
            },
            url: function() {
                return 'api/tenderRequestApply/' + this.id;
            },
            defaults: function() {
                return {
                    
                };
            }
        });

        console.info('tenderDiscursModel-LOADED===============================================');
        RES.Models.tenderDiscursModel = Backbone.Model.extend({
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                console.info("init: Model tenderDiscurs");
                this.on('change', function() {});
            },
            url: function() {
                return 'api/tenderDiscurs/' + this.id;
            },
            defaults: function() {
                return {
                     'comments':[
                        {
                        'id':'1',
                        'avatar':'/static/images/tmp/tender_images/02.png',
                        'name':'Спец деливер',
                        'replyName':'Квази-мойка',
                        'date':'11.11.1111 11:11',
                        'text':'Свежеприготовленный раствор, вследствие квантового характера явления, представляет собой гетероциклический раствор, даже если нанотрубки меняют свою межплоскостную ориентацию. Притяжение, как того требуют закон Гесса, кристаллически выпадает коллоидный рутений. При погружении в жидкий кислород брожение восстанавливает периодический белый пушистый осадок.',
                        },
                        {
                        'id':'2',
                        'avatar':'/static/images/tmp/tender_images/02.png',
                        'name':'Спец деливер',
                        'replyName':'Квази-мойка',
                        'date':'11.11.1111 11:11',
                        'text':'Свежеприготовленный раствор, вследствие квантового характера явления, представляет собой гетероциклический раствор, даже если нанотрубки меняют свою межплоскостную ориентацию. Притяжение, как того требуют закон Гесса, кристаллически выпадает коллоидный рутений. При погружении в жидкий кислород брожение восстанавливает периодический белый пушистый осадок.',
                        },
                        {
                        'id':'3',
                        'avatar':'/static/images/tmp/tender_images/02.png',
                        'name':'Спец деливер',
                        'replyName':'Квази-мойка',
                        'date':'11.11.1111 11:11',
                        'text':'Свежеприготовленный раствор, вследствие квантового характера явления, представляет собой гетероциклический раствор, даже если нанотрубки меняют свою межплоскостную ориентацию. Притяжение, как того требуют закон Гесса, кристаллически выпадает коллоидный рутений. При погружении в жидкий кислород брожение восстанавливает периодический белый пушистый осадок.',
                        },
                         {
                             'id': '4',
                             'avatar': '/static/images/tmp/tender_images/02.png',
                             'name': 'Спец деливер',
                             'replyName': 'Квази-мойка',
                             'date': '11.11.1111 11:11',
                             'text': 'Свежеприготовленный раствор, вследствие квантового характера явления, представляет собой гетероциклический раствор, даже если нанотрубки меняют свою межплоскостную ориентацию. Притяжение, как того требуют закон Гесса, кристаллически выпадает коллоидный рутений. При погружении в жидкий кислород брожение восстанавливает периодический белый пушистый осадок.',
                         }
                     ]
                };
            }
        });

//#View###########################################################

        //tenderCardView
        RES.Views.tenderCardView = Backbone.View.extend({
            el: "#insert",
            events: {

            },
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                this.el = options.insertTag;    
                this.templateFromUrl = options.template;
                this.model.bind('change', this.render, this);
                // this.model.bind("error", this.error);
                this.model.bind("all", this.DebugAllEvent);
                // this.model.fetch(); TODO
                this.render();
            },

            DebugAllEvent: function(e) {  
                    console.log("event viewCompanies:"+e);
            },
            error: function(model, error) {
                    console.log("error viewCompanies:"+error.responseJSON);
            },
            render: function(options) {
                console.log("render view tenderCard ################");
                console.log(this.model.toJSON());
                console.log("render view tenderCard ################");
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                this.$el.html(html);                       
                // RES.Views.tenderSelectWinnersView({insertTag:'.tenderCard-scope'});
                Backbone.trigger("tenderCardView:render");
                return this;
            }
        });

        //tenderSendRequestsView
        RES.Views.tenderSendRequestsView = Backbone.View.extend({
            el: "#insert",
            page:'0',
            events: {
                'click .tenderSendRequests-scope .showMore': 'renderMore'
            },
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                this.insertTag = options.insertTag;
                this.templateFromUrl = options.template;
                this.model.bind('change', this.render, this);
                // this.model.bind("error", this.error);
                this.model.bind("all", this.DebugAllEvent);
                // this.model.fetch(); TODO
                this.render();
            },
            DebugAllEvent: function(e) {  
                    console.log("event viewCompanies:"+e);
            },
            error: function(model, error) {
                    console.log("error viewCompanies:"+error.responseJSON);
            },
            renderMore: function(item) {  
                this.model.fetch({reset: true,data: { page: this.page++} }); //TODO-front:edit on production
                requestBlock = $(this.templateFromUrl).find('.requests-wrapper').html();
                var tmpl = _.template(RES.Utils.unescapeHtml(requestBlock));
                var html = tmpl(this.model.toJSON());
                $('.requests-wrapper').append(html);
            },
            render: function(options) {
                console.log("render view tenderSendRequests ################");
                console.log(this.model.toJSON());
                console.log("render view tenderSendRequests ################");
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                $(this.insertTag).append(html);
                Backbone.trigger("tenderSendRequestsView:render");
                return this;
            }
        });

        //tenderSelectWinnersView
        RES.Views.tenderSelectWinnersView = Backbone.View.extend({
            el: "#insert",
            events: {
                'click .btn.finishTender':'finishTender'
            },
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                this.insertTag = options.insertTag;
                this.templateFromUrl = options.template;
                this.model.bind('change', this.render, this);
                // this.model.bind("error", this.error);
                this.model.bind("all", this.DebugAllEvent);
                // this.model.fetch(); TODO
                this.render();
            },
            DebugAllEvent: function(e) {  
                    console.log("event viewCompanies:"+e);
            },
            error: function(model, error) {
                    console.log("error viewCompanies:"+error.responseJSON);
            },
            finishTender:function(e) {  
                    this.model.save();
            },
            render: function(options) {
                console.log("render view tenderSelectWinners ################");
                console.log(this.model.toJSON());
                console.log("render view tenderSelectWinners ################");
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                // console.log(html);
                // console.log(this.el); 
                $(this.insertTag).append(html);
                Backbone.trigger("tenderSelectWinnersView:render");
                return this;
            }
        });

        //tenderRequestApply
        RES.Views.tenderRequestApplyView = Backbone.View.extend({
            el: "#insert",
            events: {

            },
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                this.insertTag = options.insertTag;
                this.templateFromUrl = options.template;
                this.model.bind('change', this.render, this);
                // this.model.bind("error", this.error);
                this.model.bind("all", this.DebugAllEvent);
                // this.model.fetch(); TODO-front
                this.render();
            },
            DebugAllEvent: function(e) {  
                    console.log("event tenderRequestApply:"+e);
            },
            error: function(model, error) {
                    console.log("error tenderRequestApply:"+error.responseJSON);
            },
            render: function(options) {
                console.log("render view tenderRequestApply ################");
                // console.log(this.model.toJSON());
                console.log("render view tenderRequestApply ################");
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                $(this.insertTag).append(html);
                RES.Utils.datePicker($('.tenderRequestApply-scope .datepicker')); 
                RES.Utils.dropDown();
                Backbone.trigger("tenderRequestApplyView:render");
                return this;
            }
        });

        //tenderDiscurs
        RES.Views.tenderDiscursView = Backbone.View.extend({
            el: "#insert",
            page:'0',
            events: {
                'click .tenderDiscurs-scope .showMore': 'renderMore'
            },
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                this.insertTag = options.insertTag;
                this.templateFromUrl = options.template;
                this.model.bind("error", this.error);
                this.model.bind("all", this.DebugAllEvent);
                // this.model.fetch(); TODO
                this.render();
            },
            DebugAllEvent: function(e) {  
                    console.log("event viewCompanies:"+e);
            },
            error: function(model, error) {
                    console.log("error viewCompanies:"+error.responseJSON);
            },
            renderMore: function(item) {  
                this.model.fetch({reset: true,data: { page: this.page++} }); //TODO-front:edit on production
                commetBlock = $(this.templateFromUrl).find('.comment-wrapper').html();
                var tmpl = _.template(RES.Utils.unescapeHtml(commetBlock));
                var html = tmpl(this.model.toJSON());
                $('.comment-wrapper').append(html);
            },
            render: function(options) {
                console.log("render view tenderDiscurs ################");
                console.log(this.model.toJSON());
                console.log("render view tenderDiscurs ################");
                var tmpl = _.template(this.templateFromUrl);
                var html = tmpl(this.model.toJSON());
                $(this.insertTag).append(html);
                Backbone.trigger("tenderDiscursView:render");
                return this;
            }
        });


        //#Collections#################################################
        // RES.Collections.CollectionsOfModels = Backbone.Collection.extend({
        //     model: RES.Models.tenderCard,
        // });
        console.info('tenderCardModule-LOADED===============================================');
    return RES

}); //define('companiesModule', function () { 
