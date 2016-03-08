require.config({
    paths: {
        'text': '../bower/text/text',
    }
});

//#Routers#########################################################
require(['init', 'helpers', 'moduleCollections', 'Mauth_model'], function (init, helpers, moduleCollections, mauth_model) {
    debug.info('app-LOADED===============================================');

    RES.Utils.browserDetect();
    RES.Utils.loader();

    RES.Router = Backbone.Router.extend({
        initialize: function () {
            // this.route(/^tender\/(\d+)/, 'tender');
        },
        routes: {
            //TODO-front hash or pushstate navigation
            '': 'companies',
            'auth(/)': 'auth',
            'forgot(pass)(/)(/:hash)': 'forgotPass',

            'tenders(/)': 'tenders',

            'companies(/:page)': 'companies',
            'companies(/:id)': 'company',
            'mycompany': 'mycompany',
            'mycompany/edit': 'companyEdit',
            'mycompany/preview': 'companyPreview',

            'tender/create(/)': 'tenderCreate',
            'tender/edit/:id(/)': 'tenderEdit',

            'tender/my/:id': 'tenderMy',
            'tender/:id': 'tender',

            'tenders/my/requests(/)': 'tendersMyRequest',
            'tenders/my(/)': 'tendersMy',

            'transactions(/)': 'transactions',

            'deals(/)': 'mydeals',
            'deals/:page(/)': 'dealsList',
            //'deals/my/:date': 'deals',
            //'deals/do/:id': 'dealsDo',
            'deals/offerto/:id': 'dealsOfferto',
            'deals/sentence/:id': 'dealsSentence',

            'notifications(/)': 'notifications',
            'my/registration/:smsOrCode': 'employeeCardReg',

            'registration': 'registration',
            'registration/notactive': 'link_not_active',
            'registration/sendmail': 'send_mail',
            'registration/lawinfo': 'lawinfo',
            'registration/companyinfo': 'companyinfo',
            'registration/tariff': 'tariff',
            'registration/representative': 'representative',
            
            'manage(/)': 'manage',
            'invite/accept/:token(/)': 'invitation_reg', // TODO-front rewrite ASA back updated

            'calendar/year(/:date)(/)': 'calendarYear',
            'calendar/month(/:date)(/)': 'calendarMonth',
            'calendar/week(/:date)(/)': 'calendarWeek',
            'calendar/day(/:date)(/)': 'calendarDay',
            'calendar(/)': 'calendar',

            'mycount/:date(/:page)(/:date)': 'mycount',

            'requisites/my(/)': 'requisitesMy',

            'requisites(/:id)': 'requisites',
            'requisites/edit(/:id)': 'requisitesEdit',

            'workers/add(/)': 'workersEdit',
            'workers/edit/:id(/)': 'workersEdit',
            'workers/role/edit/:id(/)': 'workersEdit',
            'workers(/)': 'workers',

            'settings(/)': 'settings',
            'settings/personal': 'settingsPersonal', // settings === settingsPersonal
            'settings/personal/edit': 'settingsPersonalEdit',
            'settings/personal/preview': 'settingsPersonalPreview',

            'settings/plan(/)': 'settingsPlan',
            'settings/notifications(/)': 'settingsNotifications',
            'settings/security(/)': 'settingsSecurity',

            'report/:id(/)': 'report',

            'reports/:id(/)': 'report',
            'reports(/)': 'reports',
            
            'complaint/company/:id': 'complaint',
            'complaint/deal/:id': 'complaint',
            'complaint/done': 'complaintDone',

            'docs(/)': 'docs', //TODO-front:end slashes?
            'howto(/)': 'howTo', //Как это работает

            'file': 'fileUpload', //TODO-front fix

            'updateBrowser(/)': 'updateBrowser',
            '404(/)': 'notFound',
            '*path(/)': 'notFound',
            '500(/)': 'serverError'

        },

        notifications: function(){

        },

        calendar: function(){

        },

        reports: function(){

        },

        howTo: function(){

        },

        transactions: function(){},

        requisitesMy: function(){

        },

        auth: function () {
            debug.info('auth route');
            RES.Modules.Auth();
        },
        dealsList:function(){
            debug.info('dealsList route');
            RES.Modules.DealsList();
        },
        dealsOfferto:function(){
            debug.info('dealsOfferto route');
            RES.Modules.DealsOfferto();
        },
        dealsSentence:function(){
            debug.info('dealsSentence route');
            RES.Modules.DealsSentence();
        },

        docs: function(){
            debug.info('docs route');
            RES.Modules.Docs();
        },

        mydeals:function(){
            debug.info('mydeals route');
            RES.Modules.Mydeals();
        },
        forgotPass: function (hash) {
            debug.info('forgotPass route');
            RES.Modules.ForgotPass();
        },
        registration: function (hash) {
            debug.info('registration route');
            RES.Modules.Registration();
        },
        link_not_active: function (hash) {
            debug.info('linkNotActive route');
            RES.Modules.LinkNotActive();
        },
        send_mail: function () {
            debug.info('sendMail route');
            RES.Modules.SendMail();
        },
        representative: function () {
            debug.info('representative route');
            RES.Modules.Representative();
        },
        companyinfo: function () {
            debug.info('CompanyInfo route');
            RES.Modules.CompanyInfo();
        },
        tariff: function () {
            debug.info('tariff route');
            RES.Modules.Tariff();
        },
        lawinfo: function () {
            debug.info('lawinfo route');
            RES.Modules.LawInfo();
        },
        companies: function (page) {
            RES.Modules.SearchWidget({filter: true});
            RES.Modules.Companies();
        },
        company: function (pk) {
            debug.info('company route');
            RES.Modules.SearchWidget({filter: true});
            RES.Modules.Company(pk);
            // RES.Modules.Slider({insertTag:'.company-scope'});
        },

        mycompany: function () {
            debug.info('my company');
            RES.Modules.SearchWidget({filter: true});
            RES.Modules.MyCompany();
        },

        tender: function (pk) {
            debug.info('tender route');
            RES.Modules.TenderCard(pk);
            var options = {'pk':pk,insertTag:'#insert .container'}
            Backbone.on("tenderCardView:render", 
                function(){RES.Modules.TenderSendRequests(options)}
            );            
            Backbone.on("tenderSendRequestsView:render", 
                function(){RES.Modules.TenderSelectWinners(options)}
            );            
            Backbone.on("tenderSelectWinnersView:render", 
                function(){RES.Modules.TenderRequestApply(options)}
            );            
            Backbone.on("tenderRequestApplyView:render", 
                function(){RES.Modules.TenderDiscurs(options)}
            );
            
        },
        tenderMy: function (pk) {//TODO:front:rewrite load on previous render
            debug.info('tender route');
            RES.Modules.TenderCard(pk);
            RES.Modules.TenderDiscurs({'pk':pk,insertTag:'.tenderCard-scope'});
            RES.Modules.TenderRequestApply({'pk':pk,insertTag:'.tenderCard-scope'});
            RES.Modules.TenderSelectWinners({'pk':pk,insertTag:'.tenderCard-scope'});
            RES.Modules.TenderSendRequests({'pk':pk,insertTag:'.tenderCard-scope'});
        },
        tenders: function () {
            debug.info('tenders route');
            RES.Modules.SearchWidget({filter: true});
            RES.Modules.Tenders();
        },
        tenderCreate: function () {//TODO:front:rewrite load on previous render
            debug.info('tenderCreate route');
            // RES.Modules.TenderDiscurs({'pk':pk,insertTag:'.tenderCard-scope'});
            // RES.Modules.TenderSelectWinners({'pk':pk,insertTag:'.tenderCard-scope'});
            // RES.Modules.TenderSendRequests({'pk':pk,insertTag:'.tenderCard-scope'});
            RES.Modules.TenderCreate();
            RES.Modules.TenderDiscurs({'pk':pk,insertTag:'.tenderCard-scope'});
            RES.Modules.TenderSelectWinners({'pk':pk,insertTag:'.tenderCard-scope'});
            RES.Modules.TenderSendRequests({'pk':pk,insertTag:'.tenderCard-scope'});
        },
        tendersMyRequest: function () {
            debug.info('tenderMyRequest route');
            RES.Modules.TendersMyRequests();
        },
        tendersMy: function () {
            debug.info('tendersMy route');
            RES.Modules.TendersMy();
        },
        employeeCardReg: function (smsOrCode) {
            debug.info('employeeCardReg route');
            RES.Modules.SearchWidget({filter: true});
            RES.Modules.employeeCardReg(pk);
        },
        employeeCardEdit: function (pk) {
            debug.info('employeeCardEdit route');
            RES.Modules.SearchWidget({filter: true});
            RES.Modules.employeeCardReg(pk)
        },
        employeeCardPreview: function (pk) {
            debug.info('employeeCardPreview route');
            RES.Modules.SearchWidget({filter: true});
            RES.Modules.employeeCardPreview(pk);
        },
        calendarYear: function (date) {
            debug.info('calendarYear route');
            RES.Modules.calendarYear(date);
        },
        calendarMonth: function (date) {
            debug.info('calendarMonth route');
            RES.Modules.calendarMonth(date);
        },
        calendarWeek: function (date) {
            debug.info('calendarWeek route');
            RES.Modules.calendarWeek(date);
        },
        calendarDay: function (date) {
            debug.info('calendarDay route');
            RES.Modules.calendarDay(date);
        },
        myCount: function (date, page) {
            debug.info('myCount route');
            RES.Modules.mycount(date, page);
        },

        settingsPersonal: function(){
          this.settings()
        },

        settingsPersonalEdit: function(){
            this.settings('edit')
        },

        settingsPersonalPreview: function(){
            this.settings('preview')
        },

        settings: function (mode) {
            debug.info('settings route - personal');
            RES.Modules.Settings();
            RES.Modules.SettingsPersonal({insertTag:'#settingsInsert', mode: mode});
        },
        settingsPlan: function () {
            debug.info('settings route - plan');
            RES.Modules.Settings();
            RES.Modules.SettingsPlan({insertTag:'#settingsInsert'});
        },
        settingsNotifications: function () {
            debug.info('settings route - Notifications');
            RES.Modules.Settings();
            RES.Modules.SettingsNotifications({insertTag:'#settingsInsert'});
        },
        settingsSecurity: function () {
            debug.info('settings route - Security');
            RES.Modules.Settings();
            RES.Modules.SettingsSecurity({insertTag:{
                        'headerSetting':'#headerSetting',
                        'changeLockingCompany':'#lockingCompany',
                        'changeNumberMobile':'#changeNumberMobile',
                        'changePassword':'#changePassword'
                    }});
        },
        companyEdit: function (pk) {
            debug.info('companyEdit route');
            RES.Modules.CompanyEdit(pk);
        },
        complaint: function (pk) {
            debug.info('complaint route');
            RES.Modules.complaint(pk);
        },
        complaintDone: function () {
            debug.info('complaintDone route');
            RES.Modules.complaintDone(pk);
        },
        updateBrowser: function () {
            debug.info('updateBrowser route');
            RES.Modules.updateBrowser();
        },
        notFound: function (path) {
            debug.info('notFound route');
            RES.Modules.NotFound();
        },
        serverError: function () {
            debug.info('serverError route');
            RES.Modules.ServerError();

        },
        manage: function () {
            debug.info('manage route');
            RES.Modules.manageStaff();
            RES.Modules.manageRoles();
        },
        fileUpload: function(){
            debug.info('fileUpload');
            RES.Modules.fileUpload();
        }

    });


    Router = new RES.Router();
    RES.Auth = new RES.Models.authModel();

    Backbone.history.start();

    RES.Utils.cacheModulesInDom(Router);
    RES.Utils.scrollToTop(Router);
    RES.Utils.authCheck();
    RES.Utils.BackboneSyncOverrite();

    //RES.Modules.Notification({insertTag:'#header'});
    RES.Modules.Navigation({});

    //TODO-front вынести в отдельные модули!
    _.extend(Backbone.View.prototype, {
        //Links it is list {model.attr : jquery object with val}
        // but now it is using attr name
        links:  {} ,

        //function that get attr of model and return list { model.attr : value}
        getDataByModel: function(attr){
            var result = {};
            if ( attr != undefined ){
                result[attr] = $(this.el).find('[name='+(this.links)[attr] + ']').val();
                return result;
            }
            var tmpresult = this.links;
            for (var key in tmpresult) {
                if (tmpresult.hasOwnProperty(key)) {
                    result[key] = $(this.el).find('[name='+(tmpresult[key]) + ']').val();
                }
            }
            return result;
        },

        //function that get name of input and return list { model.attr : value}
        getDataByView: function(attr){
            var tmpresult = this.links;
            var result = {};
            if ( attr != undefined ){
                for (var key in tmpresult) {
                    if (tmpresult.hasOwnProperty(key) && tmpresult[key] == attr) {
                        result[key] = $(this.el).find('[name='+ attr + ']').val();
                    }
                }
                return result;
            }

            return this.getDataByModel();
        },
        parseErrors: function(errors){
            var tmpresult = this.links;
            var result = {};
            for (var key in errors) {
                if (tmpresult.hasOwnProperty(key)) {
                    result[tmpresult[key]] = errors[key];
                }
            }
            return result
        }
    });


    _.extend(Backbone.Validation.validators, {
      res: function(value, attr, customValue, model,computed) {
            switch (customValue) {
                case 'firstName':
                    if (!value) return 'Укажите пожалуйcта имя';
                    if (value.length > 80) return 'Извините, имя не должно содержать более 80 символов.';
                    break;
                case 'lastName':
                    if (!value) return 'Укажите пожалуйcта фамилию';
                    if (value.length > 80) return 'Извините, фамилия не должна содержать более 80 символов.';
                    break;
                case 'ogrn':
                    if (!value) return 'Укажите пожалуйста основной государственный регистрационный номер';

                    var checkedValue = value;
                    if (checkedValue.length == 13) {
                        if (checkedValue.slice(-1) != ((checkedValue.slice(0, -1)) % 11 + '').slice(-1)) {
                            return 'Данный основной государственный регистрационный номер неправильный. Пожалуйста введите код заново';
                        }
                    } else {
                        if (checkedValue.length == 15) {
                            if (checkedValue.slice(-1) != ((checkedValue.slice(0, -1)) % 13 + '').slice(-1)) {
                                return 'Данный основной государственный регистрационный номер неправильный. Пожалуйста введите код заново';
                            }
                        }
                    }
                    break;
                case 'email':
                    if (!value) return 'Укажите пожалуйcта адрес электронной почты';
                    if (value.length > 80) return 'Извините, адрес электронной почты не должен превышать 80 символов';
                    var regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
                    if (!regex.test(value)) {
                        return 'Неправильная электронная почта';
                    }
                    break;
                case 'nameCompany':
                    if (!value) return 'Укажите пожалуйста название компании';
                    if (value.length > 80) return 'Извините, название компаний не должно превышать 80 символов';
                    break;
                case 'descriptionCompany':
                    if (!value) return 'Кратко опишите вашу компанию, пожалуйста';
                    if (value.length > 100) return 'Извините, краткое описание должно содержать не больше 100 символов';
                    break;
                case 'realAddress':
                    if (!value) return 'Пожалуйста укажите ваш фактический адрес';
                    if (value.length > 128) return 'Извините, фактический адрес не может содержать больше 128 символов';
                    break;
                case 'category':
                    // TODO-front: валидация категории недоделалана
                    if (!value) return 'Извините, вы должны выбрать категорию своего бизнеса';
                    if (value.length > 3) return 'Извините, вы не можете выбрать больше чем 3 категорий для своего бизнеса';
                    break;
                case 'offer':
                    if (!value) return 'Укажите пожалуйста что ваша компания может предложить для продажи, используя теги. Что бы указать тег используйте запятую.';
                    if (value.length > 30) return 'Извините, один из тегов содержит больше 30 символов';
                    if (value.length > 15) return 'Извините, вы не можете использовать более 15 тегов';
                    break;
                case 'phone':
                    break;
                case 'phone_mask':
                    if (!value) return 'Укажите пожалуйста номер телефона';
                    if (value.length < 16) return 'Вы указали неправильный телефон. Пожалуйста проверьте';
                    break;
                case 'password':
                    if (!value) return 'Укажите пожалуйста пароль';
                    if (value.length < 6) return 'Ваш пароль должен содержать минимум 6 символов';
                    if (value.length > 80) return 'Извините, пароль не должен превышать 80 символов';
                    break;
                case 'smsCode':
                    // TODO-front: валидация кода уточнить
                    break;
                case 'position':
                    if (!value) return 'Укажите пожалуйcта вашу текущию должность';
                    if (value.length > 40) return 'Извините, должность не должно превышать 40 символов';
                    break;
                default:
                    break;
            }
        }
    });


    debug.info('app-LOADED===============================================');

}); //require(['init','helpers'], function (init,helpers) {
