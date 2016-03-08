define('MsettingsPersonal', function (settingsPersonal) {
    //#Models##########################################################
    console.info('settingsPersonalModel-LOADED===============================================');
    RES.Models.settingsPersonalModel = Backbone.Model.extend({
        initialize: function (options) {
            this.options = options;
            this.id = options.id;
            this.on('change', function () {
            });
        },
        url: function () {
            return '/api/profile/';
        },
        validation: {
            first_name: {
                res: 'firstName'
            },
            last_name: {
                res: 'lastName'
            },
            position: {
                res: 'position'

            }
        },
        default: {
            first_name: 'Имя',
            last_name: 'Фамилия',
            position: 'Должность',
            role: 'Роль',
            id: 1
        }
    });

    //#View###########################################################

    //settingsPersonalView
    RES.Views.settingsPersonalView = Backbone.View.extend({
        el: '#insert',
        initialize: function (options) {
            Backbone.Validation.bind(this);
            this.options = options;
            this.mode = options.mode;
            this.templateFromUrlMain = options.template.main;
            this.templateFromUrlEdit = options.template.edit;
            this.templateFromUrlPreview = options.template.preview;
            this.el = options.insertTag;
            //this.extend({el :  options.insertTag}) //TODO-frotn WTF!?
            this.model.bind('sync', this.renderTemplate, this);
            this.model.bind("all", this.DebugAllEvent);
            // this.model.save(); TODO-front
            // this.model.bind("", this.settingsPersonalSuccessRender,this); //TODO-front
            //this.render();
            this.model.fetch();
        },
        links: {
            first_name: 'firstNameA',
            last_name: 'lastName1',
            position: 'position1'
        },

        renderTemplate: function () {
            var mode = this.mode;

            if (mode === 'edit') {
                this.toEditMode();
            } else if (mode === 'preview') {
                this.toPreviewMode();
            } else {
                this.toMainMode();
            }
        }
        ,

        events: {
            'click a.edit': 'toEditModeOnClick',
            'click button.save': 'save',
            'click button.save-preview': 'savePreview',
            'click a.preview': 'toPreviewModeOnClick',
            'click a.cancelEdit': 'cancel',
            'focusout input': 'focusOutValid'
        }
        ,
        focusOutValid: function (event) {
            var data = this.getDataByView($(event.target).attr('name'));
            var errors = this.model.preValidate(data);
            if (errors) {
                RES.Utils.showErrors(this.parseErrors(errors));
            } else {
                RES.Utils.hideError($(event.target).attr('name'));
            }
        },

        toPreviewModeOnClick: function(){
            Router.navigate('settings/personal/preview',{});
            this.toPreviewMode();
        },

        toEditModeOnClick: function(){
            Router.navigate('settings/personal/edit',{});
            this.toEditMode();
        },

        cancel: function () {
            this.model.set(this.tmpmodel);
            this.render(this.options);
            Router.navigate('settings',{});
        }
        ,
        save: function (event) {
            var data = this.getDataByModel();
            var errors = this.model.preValidate(data);
            if (!errors) {

                this.model.set(data);
                this.tmpmodel = this.model.toJSON();
                this.model.save();
                //TODO-front add api to save
            } else {
                RES.Utils.showErrors(this.parseErrors(errors));
            }

        }
        ,
        savePreview: function () {
            this.tmpmodel = this.model.toJSON();
            this.model.save();
            //TODO-front add api to save
        }
        ,
        toMainMode: function () {
            this.render();
        }
        ,

        toEditMode: function () {
            this.settingsPersonalEdit(this.options);
        }
        ,
        toPreviewMode: function () {
            var data = this.getDataByModel();
            var errors = this.model.preValidate(data);
            if (!errors) {
                this.model.set(data);
                this.settingsPersonaPreview(this.options);
            } else {
                RES.Utils.showErrors(this.parseErrors(errors));
            }

        }
        ,
        settingsPersonalEdit: function (options) {
            var tmpl = _.template(this.templateFromUrlEdit);
            var html = tmpl(this.model.toJSON());
            $(this.el).html(html);
            return this;
        }
        ,
        settingsPersonaPreview: function (options) {
            var tmpl = _.template(this.templateFromUrlPreview);
            var html = tmpl(this.model.toJSON());
            $(this.el).html(html);
            return this;
        }
        ,
        render: function (options) {

            var tmpl = _.template(this.templateFromUrlMain);
            var html = tmpl(this.model.toJSON());
            this.tmpmodel = this.model.toJSON();
            $(this.el).html(html);
            return this;
        }
    });

    console.info('settingsPersonalModule-LOADED===============================================');
    return RES

}); //define('companiesModule', function () { 
