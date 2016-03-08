define('Mcompanyinfo', function (auth) {
    console.info('companyinfoModule-LOADED===============================================');
    //#Models##########################################################
    RES.Models.companyInfoModel = Backbone.Model.extend({
        url: "/api/auth/",
        initialize: function () {
            console.info("Model companyInfo init");
            this.on('change', function () {
            });
        },
        defaults: function () {
            return {};
        },
        validation: {
            name: {
                res: 'nameCompany'
            },
            description: {
                res: 'descriptionCompany'
            },
            actual_address: {
                res: 'realAddress'
            },
            phone_mask: {
                res: 'phone_mask'
            },
            tags_sell: {
                res: 'category'
            },
            phone: {
                res: 'phone'
            },
            offer: {
                res: 'offer'
            }
        }
    });

    //#View###########################################################
    //authView
    RES.Views.companyInfoView = Backbone.View.extend({
        el: "#insert",
        events: {
            'click .btn_company_info': 'companyInfo',
            'focusout input': 'focusOutValid'
        },
        focusOutValid: function (event) {
            var data = this.getDataByView($(event.target).attr('name'));
            var errors = this.model.preValidate(data);
            if (errors) {
                RES.Utils.showErrors(this.parseErrors(errors));
            } else {
                RES.Utils.hideError($(event.target).attr('name'));
            }
        },
        links: {
            name: 'name',
            description: 'description',
            actual_address: 'actual_address',
            tags_sell: 'tags_sell',
            phone_mask: 'phone_mask',
            phone: 'phone',
            offer: 'offer',
            logo_company: 'logo_company'
        },
        initialize: function (options) {
            Backbone.Validation.bind(this);
            this.options = options;
            this.templateFromUrl = options.template;
            this.render();

            this.model.bind("sync", this.successRegistration, this);
            mask_init();
        },
        error: function (model, error) {
            console.log('error 401: notAuth' + error);
        },
        successRegistration: function (data) {
            RES.Env.user.phone = data.changed.phone;
            RES.Env.user.first_name = data.changed.first_name;
            RES.Env.user.email = data.changed.email;
            Backbone.history.navigate('#registration/representative', true);
        },
        companyInfo: function () {
            var data = this.getDataByView();
            var errors = this.model.preValidate(data);
            if (!errors) {
                var data = this.getDataByView();
                this.model.url = "/api/registration/user/step3/";
                this.model.save(data);
            } else {
                RES.Utils.showErrors(errors);
            }
        },
        render: function () {
            console.log("render view auth");
            console.log(this.model.toJSON());
            var tmplCompanyInfo = _.template(this.templateFromUrl);
            var html = tmplCompanyInfo(this.model.toJSON());
            this.$el.html(html);
            return this;
        }
    });
    console.info('companyinfoModule-LOADED===============================================');
    return RES
}); //define('authModule', function () { 
