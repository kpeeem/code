define('Mtariff', function (auth) {
    console.info('tariffModule-LOADED===============================================');
    //#Models##########################################################
    RES.Models.tariffModel = Backbone.Model.extend({
        url: "/api/auth/",
        initialize: function () {
            console.info("Model lawInfo init");
            this.on('change', function () {
            });
        },
        defaults: function () {
            return {
                'tariffs': {
                    '1': {
                        'img': '/media/media/item_tareff.png',
                        'header': 'Тарифный план «Стартап»',
                        'text': 'Никаких комиссий за транзакции, лимит от 10 000 Р до 300 000 Р, абонентская плата - 5 000 Р в месяц.',
                        'help': 'После выбора тарифа с вами свяжется менеджер и уточнит все детали',
                        'nameTariff':'Tariff1'
                    },
                    '2': {
                        'img': '/media/media/item_tareff.png',
                        'header': 'Тарифный план «Старт»',
                        'text': '3% комиссии за транзакции, отсутствует возможность ухода в лимит, никакой абонентской платы.',
                        'help': 'После выбора тарифа с вами свяжется менеджер и уточнит все детали',
                        'nameTariff':'Tariff2'
                    },
                    '3': {
                        'img': '/media/media/item_tareff.png',
                        'header': 'Тарифный план «Бизнес»',
                        'text': 'Никаких комиссий за транзакции, лимит 300 000 Р до 1,5 млн Р, абонентская плата - 20 000 Р в месяц.',
                        'help': 'После выбора тарифа с вами свяжется менеджер и уточнит все детали',
                        'nameTariff':'Tariff3'
                    },
                    '4': {
                        'img': '/media/media/item_tareff.png',
                        'header': 'Тарифный план «Бизнес-развитие»',
                        'text': 'Никаких комиссий за транзакции, лимит от 1,5 млн Р до 3 млн Р, абонентская плата - 30 000 Р в месяц.',
                        'help': 'После выбора тарифа с вами свяжется менеджер и уточнит все детали',
                        'nameTariff':'Tariff4'
                    },
                    '5': {
                        'img': '/media/media/item_tareff.png',
                        'header': 'Тарифный план «Большой бизнес»',
                        'text': 'Никаких комиссий за транзакции, лимит от 5 млн Р до 10 млн Р, абонентская плата - 70 000 Р в месяц.',
                        'help': 'После выбора тарифа с вами свяжется менеджер и уточнит все детали',
                        'nameTariff':'Tariff5'
                    },
                    '6': {
                        'img': '/media/media/item_tareff.png',
                        'header': 'Тарифный план «Индивидуальный»',
                        'text': 'Никаких комиссий за транзакции, лимит от 10 млн Р, абонентская плата - подбирается индивидуально.',
                        'help': 'После выбора тарифа с вами свяжется менеджер и уточнит все детали',
                        'nameTariff':'Tariff6'
                    }
                }
            }
        }
        //,
        //model: {
        //    token: {
        //        res: 'token'
        //    },
        //    tariff: {
        //        res: 'tariff'
        //    }
        //}
    });
    //#View###########################################################
    //authView
    RES.Views.tariffView = Backbone.View.extend({
        el: "#insert",
        events: {
            'click a.res_btn_tariff': 'selectTariff'
        },
        initialize: function (options) {
            this.options = options;
            this.templateFromUrl = options.template;
            this.templateFromUrlTemplateTariff = options.templateTariff;
            this.render();
        },
        getDataFromView: function (event) {
            return {
                token: "1234567890",
                tariff: $(event.toElement).attr('data-name-tariff')
            }
        },
        error: function (model, error) {
            console.log('error 401: notAuth' + error);
        },
        selectTariff:function(event){
            //TODO-front: проверить на валидность
            var data = this.getDataFromView();
            this.model.url = "/api/registration/user/step4/";
            this.model.save(data);

            //TODO-front:настроить переход
            window.location = '/';
        },
        render: function () {
            console.log("render view auth");
            console.log(this.model.toJSON());
            var tmplTariff = _.template(this.templateFromUrl);
            var html = tmplTariff(this.model.toJSON());
            this.$el.html(html);
            var tmplTariffItem = _.template(this.templateFromUrlTemplateTariff);
            var htmlTariffItem = tmplTariffItem(this.model.toJSON());
            $('.field_all_tariff').html(htmlTariffItem);
            return this;
        }
    });
    console.info('tariffModule-LOADED===============================================');
    return RES
}); //define('authModule', function () { 
