define('Mrepresentative', function (auth) {
    console.info('representativeModule-LOADED===============================================');
    //#Models##########################################################
    RES.Models.representativeModel = Backbone.Model.extend({
        url: "/api/auth/",
        initialize: function () {
            console.info("Model lawInfo init");
            this.on('change', function () {
            });
        },
        defaults: function () {
            return {
                'phone': RES.Env.user.phone,
                'first_name': RES.Env.user.first_name,
                'email': RES.Env.user.email
            }
        },
        validation: {
            first_name: {
                res: 'firstName'
            },
            last_name: {
                res: 'lastName'
            },
            email: {
                res: 'email'
            },
            role: {
                res: 'position'
            },
            phone: {
                res: 'phone'
            },
            code: {
                res: 'smsCode'
            }
        }
    });
    //#View###########################################################
    //authView
    RES.Views.representativeView = Backbone.View.extend({
        el: "#insert",
        events: {
            'click button.btn_save_number': 'saveNumber',//отправить номер
            'click button.btn_send_sms': 'submitInfoRepresentative',//отправить всю форму
            'click .send_sms.active': 'sendSms',
            'click .update_phone': 'editPhone',
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
            first_name: 'first_name',
            last_name: 'last_name',
            email: 'email',
            role: 'role',
            phone: 'phone',
            code: 'code'
        },
        initialize: function (options) {
            Backbone.Validation.bind(this);
            this.options = options;
            this.templateFromUrl = options.template;
            this.render();

            this.model.bind("sync", this.successRegistration, this);
            this.model.bind("error", this.error, this);
            mask_init();
        },
        error: function (model, error) {
            console.log(error)
            if (error.responseJSON && error.responseJSON.errors) {
                RES.Utils.showErrors(error.responseJSON.errors);
            }
        },
        saveNumber: function () {
            var data = this.getDataByView();
            var errors = this.model.preValidate(data);
            if (!errors) {
                this.model.url = "/api/registration/user/verificate/phone/";
                this.model.save(data);
            } else {
                RES.Utils.showErrors(errors);
            }
        },
        editPhone: function () {
            var btn_save_number = $('.btn_send_sms');
            btn_save_number.removeClass('btn_send_sms');
            btn_save_number.addClass('btn_save_number');
            $('.field_number_tel').addClass('active');
            $('.change_number_tel').removeClass('active');

        },
        successRegistration: function (data) {
            if (data.url == "/api/registration/user/verificate/phone/") {
                $('.change_number_tel').addClass('active');
                $('.field_number_tel').removeClass('active');
                $('.send_sms').addClass('active');
                var btn_save_number = $('.btn_save_number');
                btn_save_number.addClass('btn_send_sms');
                btn_save_number.removeClass('btn_save_number');
            }
            if (data.url == "/api/registration/user/step4/") {
                Backbone.history.navigate('#registration/tariff', true);
            }
        },
        submitInfoRepresentative: function () {
            var data = this.getDataByView();
            var errors = this.model.preValidate(data);
            if (!errors) {
                this.model.url = "/api/registration/user/step4/";
                this.model.save(data);
            } else {
                RES.Utils.showErrors(errors);
            }
        },
        sendSms: function () {
            if (RES.Env.statusWorkTimer == 'yes') {
                RES.Env.statusWorkTimer = 'no';
                var i = 1;
                var data = this.getDataByView();
                var errors = this.model.preValidate(data);
                if (!errors) {
                    this.model.url = "/api/registration/user/resend/sms/";
                    this.model.fetch(data);
                } else {
                    RES.Utils.showErrors(errors);
                }
                var time = function (num) {
                    return ((59 - num) < 10) ? '0' + (59 - num) : 59 - num;
                };
                var interval = setInterval(function () {
                    if (i == 58) {
                        clearInterval(interval);
                    }
                    $('.send_sms').text('Вы сможете отправить код еще раз через: 00:' + time(i++) + ' сек');
                }, 1000);
                $('.send_sms').text('Вы сможете отправить код еще раз через: 00:59 сек');
                setTimeout(function () {
                    RES.Env.statusWorkTimer = 'yes';
                    $('.send_sms').text('Повторно отправить СMC');
                }, 59000);
            }
        },
        render: function () {
            console.log("render view auth");
            console.log(this.model.toJSON());
            var tmplRepresentative = _.template(this.templateFromUrl);
            var html = tmplRepresentative(this.model.toJSON());
            this.$el.html(html);
            return this;
        }
    });
    console.info('representativeModule-LOADED===============================================');
    return RES
}); //define('authModule', function () {
