define('MsettingsSecurity', function (settingsPersonal) {
    //#Models##########################################################
    console.info('settingsSecurityModel-LOADED===============================================');
    RES.Models.settingsSecurityModel = Backbone.Model.extend({
        initialize: function (options) {
            this.options = options;
            this.id = options.id;
            console.info("init: Model settingsSecurity");
            this.on('change', function () {
            });
        },
        url: function () {
            return 'api/settingsSecurity/' + this.id;
        },
        defaults: function () {
            return {
                settings: {
                    'number': '+7 777 777-77-77'
                }
            };
        }
    });

    //#View###########################################################

    //settingsPersonalView
    RES.Views.settingsSecurityView = Backbone.View.extend({
        el: '#insert',
        events: {
            'click button.btn': 'changeSetting'
        },
        initialize: function (options) {
            // this.id = options.id;
            this.options = options;
            this.templateFromUrlChangeLockingCompany = options.template.changeLockingCompany;
            this.templateFromUrlChangeNumberMobile = options.template.changeNumberMobile;
            this.templateFromUrlChangePassword = options.template.changePassword;
            this.templateFromUrlHeaderSetting = options.template.headerSetting;
            this.templateFromUrlConfirmChangeLockingCompany = options.template.confirmChangeLockingCompany;
            this.templateFromUrlConfirmChangeNumberMobile = options.template.confirmChangeNumberMobile;
            this.templateFromUrlConfirmChangePassword = options.template.confirmChangePassword;
            this.elChangeLockingCompany = options.insertTag.changeLockingCompany;
            this.elChangeNumberMobile = options.insertTag.changeNumberMobile;
            this.elChangePassword = options.insertTag.changePassword;
            this.elHeaderSetting = options.insertTag.headerSetting;
            this.templateFromUrl = options.template;
            this.model.bind('change', this.render, this);
            // this.model.bind("error", this.error);
            this.model.bind("all", this.DebugAllEvent);
            // this.model.save(); TODO-front
            // console.log(this.templateFromUrl)
            // this.model.bind("", this.settingsPersonalSuccessRender,this); //TODO-front

            this.render();
        },
        DebugAllEvent: function (e) {
            console.log("event viewCompanies:" + e);
        },
        error: function (model, error) {
            console.log("error viewCompanies:" + error.responseJSON);
        },
        changeSetting: function (event) {
            this.settingsSecurityEdit(event.toElement);
        },
        settingsSecurityEdit: function (element) {
            switch ($(element).attr('type_btn')) {
                case 'res_password':
                    var tmplConfirmChangePassword = _.template(this.templateFromUrlConfirmChangePassword);
                    var changePassword = tmplConfirmChangePassword(this.model.toJSON());
                    $(this.elChangePassword).html('');
                    $(this.elChangePassword).html(changePassword);
                    break;
                case 'res_number_mobile':
                    var tmplConfirmChangeNumberMobile = _.template(this.templateFromUrlConfirmChangeNumberMobile);
                    var changeNumberMobile = tmplConfirmChangeNumberMobile(this.model.toJSON());
                    $(this.elChangeNumberMobile).html('');
                    $(this.elChangeNumberMobile).html(changeNumberMobile);
                    break;
                case 'res_locking_company':
                    var tmplConfirmChangeLockingCompany = _.template(this.templateFromUrlConfirmChangeLockingCompany);
                    var lockingCompany = tmplConfirmChangeLockingCompany(this.model.toJSON());
                    $(this.elChangeLockingCompany).html('');
                    $(this.elChangeLockingCompany).html(lockingCompany);
                    break;
            }
            return this;
        },
        render: function (options) {
            console.log("render view settingsSecurity ################");
            console.log(this.model.toJSON());
            console.log("render view settingsSecurity ################");
            var tmplHeaderSetting = _.template(this.templateFromUrlHeaderSetting);
            var tmplLockingCompany = _.template(this.templateFromUrlChangeLockingCompany);
            var tmplChangeNumberMobile = _.template(this.templateFromUrlChangeNumberMobile);
            var tmplChangePassword = _.template(this.templateFromUrlChangePassword);
            var headerSetting = tmplHeaderSetting(this.model.toJSON());
            var changeLockingCompany = tmplLockingCompany(this.model.toJSON());
            var changeNumberMobile = tmplChangeNumberMobile(this.model.toJSON());
            var changePassword = tmplChangePassword(this.model.toJSON());
            $(this.elHeaderSetting).html(headerSetting);
            $(this.elChangeLockingCompany).html(changeLockingCompany);
            $(this.elChangeNumberMobile).html(changeNumberMobile);
            $(this.elChangePassword).html(changePassword);
            return this;
        }
    });
    console.info('settingsSecurityModule-LOADED===============================================');
    return RES

}); //define('companiesModule', function () { 
