define('MlawInfo', function (auth) {
    console.info('lawInfoModule-LOADED===============================================');
    //#Models##########################################################
    RES.Models.lawInfoModel = Backbone.Model.extend({
        initialize: function () {
            console.info("Model lawInfo init");
            this.on('change', function () {
            });
        },
        readFile: function (file) {
            var reader = new FileReader();
            // closure to capture the file information.
            reader.onload = (function (theFile, that) {
                return function (e) {
                    //set model
                    that.set({filename: theFile.name, data: e.target.result});

                };
            })(file, this);

            // Read in the image file as a data URL.
            reader.readAsDataURL(file);
        },

        defaults: function () {

        },
        validation: {
            ogrn: {
                res: 'ogrn'
            },
            nameCompany: {
                res: 'nameCompany'
            },
            nameGenDir: {
                res: 'nameGenDir'
            },
            lawAddress: {
                res: 'lawAddress'
            }
        }
    });

    //#View###########################################################
    //authView
    RES.Views.lawInfoView = Backbone.View.extend({
        el: "#insert",
        events: {
            'click button.btn.btn_confirm': 'confirmOGRN', //отправка ОГРН/ОГРНИП на проверку
            'click button.btn_confirm_info': 'confirmInfo', //подтвердили что данные о компании верны
            'click button.btn_download': 'downloadInfo', //загрузили паспорт
            'click span.btn_update': 'updateOGRN', //изменить ОГРН/ОГРНИП
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
            ogrn: 'ogrn',
            file: 'file'
        },
        initialize: function (options) {
            Backbone.Validation.bind(this);
            this.options = options;
            this.templateFromUrl = options.template;
            this.templateFromUrlTemplateInfo = options.templateInfo;

            this.render();

            this.model.bind("sync", this.successRegistration, this);
            this.model.bind("error", this.error, this);
        },
        error: function (model, error) {
            RES.Utils.showErrors(error.responseJSON.errors);
        },
        confirmOGRN: function () {

            var data = this.getDataByView();
            var errors = this.model.preValidate(data);

            if (!errors) {
                this.model.url = "/api/registration/user/input/ogrn/";
                this.model.save(data);
            } else {
                RES.Utils.showErrors(errors);
            }
            return this;
        },
        confirmInfo: function () {
            $('.add_passport_user').addClass('active');
            var btn_confirm_info = $('.btn_confirm_info');
            btn_confirm_info.text('Загрузить');
            btn_confirm_info.addClass('btn_download');
            btn_confirm_info.removeClass('btn_confirm_info');
        },
        successRegistration: function (data) {

            if (data.url == "/api/registration/user/input/ogrn/") {
                var field_info_res = $('.field_info_res');
                field_info_res.addClass('active');
                $('.btn_update').addClass('active');
                var btn_confirm = $('.btn_confirm');
                btn_confirm.addClass('btn_confirm_info');
                btn_confirm.removeClass('btn_confirm');
                $('.btn_confirm_info').text('Да, все верно');

                var tmpl = _.template(this.templateFromUrlTemplateInfo);
                var html = tmpl(this.model.toJSON());
                field_info_res.html(html);
            }

        },
        downloadInfo: function () {
            var data = this.getDataByView();
            var errors = this.model.preValidate(data);
            if (!errors) {
                this.model.url = "/api/registration/user/input/passport/";
                this.model.save(data);
            } else {
                RES.Utils.showErrors(errors);
            }
        },
        updateOGRN: function () {
            var res_law_info_btn = $('.res_law_info_btn button.btn');
            res_law_info_btn.removeClass('btn_confirm_info');
            res_law_info_btn.removeClass('btn_download');
            res_law_info_btn.addClass('btn_confirm');
            $('.add_passport_user').removeClass('active');
            $('.field_info_res').removeClass('active');
            $('.btn_update').removeClass('active');
            res_law_info_btn.text('Далее');
        },
        render: function () {
            console.log("render view auth");
            console.log(this.model.toJSON());
            var tmplLawInfo = _.template(this.templateFromUrl);
            var html = tmplLawInfo(this.model.toJSON());
            this.$el.html(html);
            return this;
        }
    });
    console.info('lawInfoModule-LOADED===============================================');
    return RES
}); //define('authModule', function () { 
