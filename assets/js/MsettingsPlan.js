define('MsettingsPlan', function (settingsPlan) {
    //#Models##########################################################
    console.info('settingsPlanModel-LOADED===============================================');
    RES.Models.PlanModel = Backbone.Model.extend({
        initialize: function () {
            console.info("Model lawInfo init");
            this.on('change', function () {
            });
        },
        url: function () {
            return 'api/settingsPlan/' + this.id;
        },
        defaults: function () {
            return {
                'tariffs': {
                    '1': {
                        'img': '/media/media/item_tareff.png',
                        'header': 'Тарифный план «Стартап»',
                        'text': 'Никаких комиссий за транзакции, лимит от 10 000 Р до 300 000 Р, абонентская плата - 5 000 Р в месяц.',
                        'help': 'После выбора тарифа с вами свяжется менеджер и уточнит все детали',
                        'nameTariff': 'Tariff1'
                    },
                    '2': {
                        'img': '/media/media/item_tareff.png',
                        'header': 'Тарифный план «Старт»',
                        'text': '3% комиссии за транзакции, отсутствует возможность ухода в лимит, никакой абонентской платы.',
                        'help': 'После выбора тарифа с вами свяжется менеджер и уточнит все детали',
                        'nameTariff': 'Tariff2'
                    },
                    '3': {
                        'img': '/media/media/item_tareff.png',
                        'header': 'Тарифный план «Бизнес»',
                        'text': 'Никаких комиссий за транзакции, лимит 300 000 Р до 1,5 млн Р, абонентская плата - 20 000 Р в месяц.',
                        'help': 'После выбора тарифа с вами свяжется менеджер и уточнит все детали',
                        'nameTariff': 'Tariff3'
                    },
                    '4': {
                        'img': '/media/media/item_tareff.png',
                        'header': 'Тарифный план «Бизнес-развитие»',
                        'text': 'Никаких комиссий за транзакции, лимит от 1,5 млн Р до 3 млн Р, абонентская плата - 30 000 Р в месяц.',
                        'help': 'После выбора тарифа с вами свяжется менеджер и уточнит все детали',
                        'nameTariff': 'Tariff4'
                    },
                    '5': {
                        'img': '/media/media/item_tareff.png',
                        'header': 'Тарифный план «Большой бизнес»',
                        'text': 'Никаких комиссий за транзакции, лимит от 5 млн Р до 10 млн Р, абонентская плата - 70 000 Р в месяц.',
                        'help': 'После выбора тарифа с вами свяжется менеджер и уточнит все детали',
                        'nameTariff': 'Tariff5'
                    },
                    '6': {
                        'img': '/media/media/item_tareff.png',
                        'header': 'Тарифный план «Индивидуальный»',
                        'text': 'Никаких комиссий за транзакции, лимит от 10 млн Р, абонентская плата - подбирается индивидуально.',
                        'help': 'После выбора тарифа с вами свяжется менеджер и уточнит все детали',
                        'nameTariff': 'Tariff6'
                    }
                }
            }
        }
    });

    //#View###########################################################

    //settingsPlanView
    RES.Views.PlanView = Backbone.View.extend({
        events: {},
        initialize: function (options) {
            this.options = options;
            this.templateFromUrl = options.template;
            this.templateFromUrlTemplateTariff = options.templateTariff;
            this.render();
        },
        DebugAllEvent: function (e) {
            console.log("event settingsPlan:" + e);
        },
        error: function (model, error) {
            console.log("error settingsPlan:" + error.responseJSON);
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

    console.info('settingsPlanModule-LOADED===============================================');
    return RES

}); //define('companiesModule', function () { 
