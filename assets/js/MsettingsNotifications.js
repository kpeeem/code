define('MsettingsNotifications', function (settingsNotifications) { 
        //#Models##########################################################
        console.info('settingsNotificationsModel-LOADED===============================================');
        RES.Models.settingsNotificationsModel = Backbone.Model.extend({
            initialize: function(options) {
                this.options = options;
                this.id = options.id;
                console.info("init: Model settingsNotifications");
                this.on('change', function() {}); //TODO-front for future events
            },
            url: function() {
                return 'api/settingsNotifications/' + this.id;
            },
            defaults: function() {
                return {
                        'email':{
                            'dealNew':                 {'checked':true, 'disabled':false,'label':'Новая сделка'},
                            'dealChangeStatus':        {'checked':true, 'disabled':false,'label':'изменение статуса сделки'},
                            'invoiceReciept':          {'checked':true, 'disabled':false,'label':'Получение средств на счет'},
                            'invoiceWithdrawal':       {'checked':true, 'disabled':false,'label':'Списание со счета'},
                            'invoiceDo':               {'checked':true, 'disabled':true, 'label':'Формирование счета'},
                            'tenderEndRequests':       {'checked':true, 'disabled':true, 'label':'Время окончания заявок на мой тендер'},
                            'tenderEndRequestsMy':     {'checked':true, 'disabled':true, 'label':'Время окончания заявок на тендер в котором я учавствую'},
                            'tenderEndMy':             {'checked':true, 'disabled':true, 'label':'Окончание моего тендера'},
                            'tenderEndMyPart':         {'checked':false,'disabled':true, 'label':'Окончание тендера в котором я учавствую'},
                            'tenderWin':               {'checked':false,'disabled':false,'label':'Победа в тендере'},
                            'tenderNewMyCategory':     {'checked':false,'disabled':false,'label':'Новый тендер по моей категории бизнеса'},
                            'companiesListDemand':     {'checked':false,'disabled':false,'label':'Список новых компаний по моему спросу'},
                            'companiesListOffer':      {'checked':false,'disabled':false,'label':'Список новых компаний по моему предложению'}
                        },
                        'sms':{
                            'invoiceWithdrawal':       {'checked':true, 'disabled':true, 'label':'Списание со счета'},
                            'invoiceReciept':          {'checked':true, 'disabled':false,'label':'Получение на счет'},
                            'tenderWin':               {'checked':false,'disabled':true, 'label':'Победа в тендере'}
                        }
                };
            }
        });

        //#View###########################################################

        //settingsNotificationsView
        RES.Views.settingsNotificationsView = Backbone.View.extend({
            events: {

            },
            initialize: function(options) {
                // this.id = options.id;
                this.options = options;
                this.templateFromUrlMain = options.template.main;
                this.el = options.insertTag;    
                this.templateFromUrl = options.template;
                this.model.bind('change', this.render, this);
                // this.model.bind("error", this.error);
                this.model.bind("all", this.DebugAllEvent);
                // this.model.save(); TODO-front
                // console.log(this.templateFromUrl)
                this.render();
            },
            DebugAllEvent: function(e) {  
                    console.log("event settingsNotifications:"+e);
            },
            error: function(model, error) {
                    console.log("error settingsNotifications:"+error.responseJSON);
            },        
            render: function(options) {
                console.log("render view settingsNotifications ################");
                console.log(this.model.toJSON());
                console.log("render view settingsNotifications ################");
                var tmpl = _.template(this.templateFromUrlMain);
                var html = tmpl(this.model.toJSON());
                console.log(html);
                $(this.el).html(html);   
                return this;
            }
        });

        console.info('settingsNotificationsModule-LOADED===============================================');
    return RES;

}); //define('companiesModule', function () { 
