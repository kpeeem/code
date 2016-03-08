define('Mregistration', function (registration) {
    console.info('registrationModule-LOADED===============================================');
    //#Models##########################################################
    RES.Models.registrationModel = Backbone.Model.extend({
        initialize: function () {
            console.info("Model registration init");
            this.on('change', function () {
            });
        },
        defaults: function () {
            return {};
        },
        validation: {
            token: {
                res: 'token'
            },
            email: {
                res: 'email'
            },
            first_name: {
                res: 'firstName'
            },
            phone: {
                res: 'phone'
            },
            phone_mask: {
                res: 'phone_mask'
            },
            password: {
                res: 'password'
            },
            password_confirm: {
                res: 'password_confirm'
            }
        }
    });
    //#View###########################################################
    RES.Views.registrationView = Backbone.View.extend({
        el: "#insert",
        events: {
            'click button.btn_registration': 'sendRegistration', //отправка всей формы
            'keyup input[name=email]': 'sendTelEmail', //отправка номера, email и имени
            'keyup input[name=phone_mask]': 'sendTelEmail', //отправка номера, email и имени
            'keyup input[name=first_name]': 'sendTelEmail', //отправка номера, email и имени
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
            email: 'email',
            phone: 'phone',
            phone_mask: 'phone_mask',
            first_name: 'first_name',
            password: 'password'
        },
        initialize: function (options) {
            Backbone.Validation.bind(this);
            this.options = options;
            this.templateFromUrlMain = options.template.main;
            this.render();
            // this.model.bind('change', this.render,
            this.model.bind("sync", this.successRegistration, this);
            this.model.bind("error", this.error, this);
            mask_init();
        },

        successRegistration: function (data) {
            if (data.url == "/api/registration/user/verificate/email/") {
                Backbone.history.navigate('#registration/sendmail', true);
            }
        },
        error: function (model,error) {
            if (error.responseJSON && error.responseJSON.errors) {
                RES.Utils.showErrors(error.responseJSON.errors);
            }
        },
        sendRegistration: function () {
            var data = this.getDataByView();
            data.token = RES.Utils.token();
            data.password_confirm = $('input[name=password_confirm]').val();

            var errors = this.model.preValidate(data);
            console.log(errors);
            if (!errors) {
                this.model.url = "/api/registration/user/verificate/email/";
                this.model.save(data);
            } else {
                console.log(errors);
                RES.Utils.showErrors(errors);
            }
            return this;
        },
        sendTelEmail: function () {
            var data = _.extend(this.getDataByView('email'),
                this.getDataByView('phone_mask'),
                this.getDataByView('first_name')
            );
            data.token = RES.Utils.token();
            var errors = this.model.preValidate(data);
            if (!errors) {
                this.model.url = "/api/registration/user/step1/";
                this.model.save(data);
            }
            return this;
        },
        render: function () {
            console.log("render view registration");
            console.log(this.model.toJSON());
            var tmpl = _.template(this.templateFromUrlMain);
            var html = tmpl(this.model.toJSON());
            this.$el.html(html);
            return this;
        }
    })
    ;
    console.info('registrationModule-LOADED===============================================');
    return RES
})
;