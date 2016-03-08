define('MmyCompany', function (compan) {
    //#Models##########################################################
    console.info('companyModule-LOADED===============================================');
    RES.Models.myCompanyModel = Backbone.Model.extend({
        initialize: function (options) {
            this.options = options;
            console.info("init: Model companies");
            this.on('change', function () {
            });
        },
        url: function () {
            return 'api/company/1';
        },
        defaults: function () {
            return {
                'achievements': {
                    'first': {
                        'description': 'Подтверждённая компания, готовая работать внутри системы RES и проводить сделки, рассчитываясь',
                        'active': true
                    },
                    'second': {
                        'description': 'Подтверждённая компания, готовая работать внутри системы RES и проводить сделки, рассчитываясь'
                    },
                    'third': {
                        'description': 'Подтверждённая компания, готовая работать внутри системы RES и проводить сделки, рассчитываясь',
                        'active': true
                    },
                    'forth': {
                        'description': 'Подтверждённая компания, готовая работать внутри системы RES и проводить сделки, рассчитываясь'
                    },
                    'five': {
                        'description': 'Подтверждённая компания, готовая работать внутри системы RES и проводить сделки, рассчитываясь'
                    }
                },
                'companyStatus': 'active'
            };
        }
    });

    //#View###########################################################
    //companyView
    RES.Views.myCompanyView = Backbone.View.extend({
        el: "#insert",
        events: {},
        initialize: function (options) {
            // this.render();
            this.options = options;
            this.templateCompany = options.templateCompany;
            this.templateCompany = options.templateCompany;
            this.templateCompanyContacts = options.templateCompanyContacts;
            this.model.bind('change', this.render, this);
            // this.model.bind("error", this.error);
            this.model.bind("all", this.DebugAllEvent);
            this.model.fetch();
        },

        DebugAllEvent: function (e) {
            console.log("event viewCompanies:" + e);
        },
        error: function (model, error) {
            console.log("error viewCompanies:" + error.responseJSON);
        },
        render: function (options) {
            console.log("render view company ################");
            console.log(this.model.toJSON());
            console.log("render view company ################");
            var data = this.model.toJSON();
            var templateCompanyContacts = _.template(this.templateCompanyContacts);
            var templateCompany = _.template(this.templateCompany);
            var htmlContent = templateCompanyContacts(this.model.toJSON());
            var htmlCompany = templateCompany(this.model.toJSON());
            this.$el.html(htmlCompany);
            $('#info_personal').html(htmlContent);
            RES.Modules.Slider({insertTag: '.company-scope'});
            return this;
        }
    });
    console.info('companyModule-LOADED===============================================');
    return RES

}); //define('companiesModule', function () { 
