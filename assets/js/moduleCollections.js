define('moduleCollections', ['init', 'helpers'], function (moduleCollections) {
    console.info('moduleCollections.js-LOADED==============================================');
    var env = this;//For what?

    RES.Modules.Notification = function (options) {
        require(['Mnotification',
                'text!../templates/notification.tmpl'],

            function (Mnotification, Tnotification) {
                console.info('Mload: notification');
                console.info(options);
                var notificationModel = new RES.Models.notificationModel({});
                var notificationView = new RES.Views.notificationView({
                    model: notificationModel,
                    template: Tnotification,
                    insertTag: options.insertTag
                });
            }); //require
    };

    RES.Modules.Navigation = function () {
        require(['Mnav',
                'text!../templates/navigation/nav.tmpl',
                'text!../templates/navigation/nav-toggle.tmpl'],

            function (nav, Tnav, Tnav_toggle) {

                var navModel = new RES.Models.navModel();
                var navView = new RES.Views.navView({
                    model: navModel,
                    templates: {
                        Tnav: Tnav,
                        Tnav_toggle: Tnav_toggle
                    }
                });
            });
    };

    RES.Modules.Auth = function () {
        require(['Mauth',
                'text!../templates/auth.tmpl'],
            function (auth, Tauth) {
                console.info('Mload: Auth');
                var authModel = RES.Auth; //new RES.Models.authModel();

                var authView = new RES.Views.authView({
                    model: authModel,
                    template: Tauth
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.DealsList = function () {
        require(['MdealsList',
                'text!../templates/dealsList.tmpl'],
            function (auth, Deals) {
                console.info('Mload: DealsList');
                var dealsListModel = new RES.Models.dealsListModel();
                var dealsListView = new RES.Views.dealsListView({
                    model: dealsListModel,
                    template: Deals
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.DealsOfferto = function () {
        require(['MdealsOfferto',
                'text!../templates/dealsOfferto.tmpl'],

            function (auth, Deals) {
                console.info('Mload: DealsList');
                var dealsOffertoModel = new RES.Models.dealsOffertoModel();
                var dealsOffertoView = new RES.Views.dealsOffertoView({
                    model: dealsOffertoModel,
                    template: Deals
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.DealsSentence = function () {
        require(['MdealsSentence',
                'text!../templates/dealsSentence.tmpl'],
            function (auth, Deals) {
                console.info('Mload: DealsList');
                var dealsSentenceModel = new RES.Models.dealsSentenceModel();
                var dealsSentenceView = new RES.Views.dealsSentenceView({
                    model: dealsSentenceModel,
                    template: Deals
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.Docs = function () {
        require(['Mdocs',
                'text!../templates/docs.tmpl'],

            function (docs, docsTempl) {
                console.info('Mload: DealsList');
                //TODO-front get all models from server
                var docsCollection = new RES.Collections.docsCollection({});

                var docsView = new RES.Views.docsView({
                    collection: docsCollection,
                    template: docsTempl
                });
            });
    };


    RES.Modules.RegUser = function () {
        require(['MregUser',
                'text!../templates/dealsSentence.tmpl'],
            function (auth, reg) {
                console.info('Mload: regUser');
                var regUserModel = new RES.Models.regUserModel();
                var regUserView = new RES.Views.regUserView({
                    model: regUserModel,
                    template: reg
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.LawInfo = function () {
        require(['MlawInfo',
                'text!../templates/lawInfo.tmpl',
                'text!../templates/lawInfoBlockMini.tmpl'],

            function (auth, main, info) {
                console.info('Mload: lawInfo');
                var lawInfoModel = new RES.Models.lawInfoModel();
                var lawInfoView = new RES.Views.lawInfoView({
                    model: lawInfoModel,
                    template: main,
                    templateInfo: info
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.CompanyInfo = function () {
        require(['Mcompanyinfo',
                'text!../templates/companyInfo.tmpl'],
            function (auth, reg) {
                console.info('Mload: companyInfo');
                var companyInfoModel = new RES.Models.companyInfoModel();
                var companyInfoView = new RES.Views.companyInfoView({
                    model: companyInfoModel,
                    template: reg
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.Tariff = function () {
        require(['Mtariff',
                'text!../templates/tariff.tmpl',
                'text!../templates/tariffItem.tmpl'],

            function (auth, main, tariff) {
                console.info('Mload: tariff');
                var tariffModel = new RES.Models.tariffModel();
                var tariffView = new RES.Views.tariffView({
                    model: tariffModel,
                    template: main,
                    templateTariff: tariff
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.Representative = function () {
        require(['Mrepresentative',
                'text!../templates/representative.tmpl'],
            function (auth, reg) {
                console.info('Mload: tariff');
                var representativeModel = new RES.Models.representativeModel();
                var representativeView = new RES.Views.representativeView({
                    model: representativeModel,
                    template: reg
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.Mydeals = function () {
        require(['Mmydeals',
                'text!../templates/mydeals.tmpl'],
            function (auth, Deals) {
                console.info('Mload: DealsList');
                var mydealsModel = new RES.Models.mydealsModel();
                var mydealsView = new RES.Views.mydealsView({
                    model: mydealsModel,
                    template: Deals
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.ForgotPass = function () {
        require(['MforgotPass',
                'text!../templates/forgotPass.tmpl',
                'text!../templates/forgotPassSuccess.tmpl'],
            function (auth, TforgotPass, TforgotPassSuccess) {
                console.info('Mload: forgotPass');
                var forgotPassModel = new RES.Models.forgotPassModel();
                var forgotPassView = new RES.Views.forgotPassView({
                    model: forgotPassModel, template: {
                        'main': TforgotPass,
                        'success': TforgotPassSuccess
                    }
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.Registration = function () {
        require(['Mregistration',

                'text!../templates/registration.tmpl',
                'text!../templates/registrationSuccess.tmpl'],

            function (registration, Tregistration, TregistrationSuccess) {
                console.info('Mload: registration');
                var registrationModel = new RES.Models.registrationModel();
                var registrationView = new RES.Views.registrationView({
                    model: registrationModel, template: {
                        'main': Tregistration,
                        'success': TregistrationSuccess
                    }
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.LinkNotActive = function () {
        require(['MlinkNotActive',

                'text!../templates/registration_link_not_active.tmpl',
                'text!../templates/registrationSuccess.tmpl'],

            function (registration, linkNotActive) {
                console.info('Mload: registration');
                var linkNotActiveModel = new RES.Models.linkNotActiveModel();
                var linkNotActiveView = new RES.Views.linkNotActiveView({
                    model: linkNotActiveModel,
                    template: linkNotActive
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.SendMail = function () {
        require(['MsendMail',
                'text!../templates/registration_send_mail.tmpl',
                'text!../templates/registrationSuccess.tmpl'],

            function (registration, sendMail) {
                console.info('MsendMail: registration');
                var sendMailModel = new RES.Models.sendMailModel();
                var sendMailView = new RES.Views.sendMailView({
                    model: sendMailModel,
                    template: sendMail
                });
            });//require(['auth-module'], function (companies) {
    };

    RES.Modules.SearchWidget = function (options) {
        require(['Msearch',
                'text!../templates/search/search_navigation.tmpl',
                'text!../templates/search/search_filter.tmpl',
                'text!../templates/search/search_response.tmpl'
            ],
            function (global,
                      search_navigation,
                      tmpl_filter,
                      search_response) {

                var collections = [],
                    views = [],
                    models = [];


                if (options['filter']) {

                    collections['Filter'] = RES.Collections.searchWidgetFilterCollection;
                    views['Filter'] = RES.Views.searchWidgetFilterView;

                }

                models['Widget'] = new RES.Models.searchWidgetModel();

                views['Input'] = new RES.Views.searchWidgetView({
                    template: search_navigation,
                    model: models['Widget'],
                    child_views: views,
                    isfilter: options['filter'],
                    child_collections: collections,
                    filter_template: tmpl_filter,
                    templates_search_response: search_response
                });

            }
        )
        ;
    };//RES.Modules.SearchWidget = function (options) {

    RES.Modules.Companies = function () {
        require(['Mcompanies',
                'text!../templates/companies.tmpl'],
            function (companies, Tcompanies) {
                console.info('Mload: companies');
                var companiesModel = new RES.Models.companiesModel();
                var companiesView = new RES.Views.companiesView({
                    model: companiesModel,
                    template: Tcompanies
                });
                // var CollectionsOfModels = new RES.Collections.CollectionsOfModels;
                // CollectionsOfModels.fetch();
            });//require
    };

    RES.Modules.Company = function (pk) {
        require(['Mcompany',
                'text!../templates/company.tmpl'],
            function (company, Tcompany) {
                console.info('Mload: companyEdit');
                var companyModel = new RES.Models.companyModel({
                    id: pk
                });
                var companyView = new RES.Views.companyView({
                    model: companyModel,
                    template: Tcompany
                });
                return this;
            }); //require
    };
    RES.Modules.MyCompany = function (pk) {
        require(['MmyCompany',
                'text!../templates/company.tmpl',
                'text!../templates/companyContacts.tmpl'
            ],
            function (company, Tcompany, TcompanyContacts) {
                console.info('Mload: myCompany');
                var myCompanyModel = new RES.Models.myCompanyModel({});
                var myCompanyView = new RES.Views.myCompanyView({
                    model: myCompanyModel,
                    templateCompany: Tcompany,
                    templateCompanyContacts: TcompanyContacts
                });
                return this;
            }); //require
    };

    RES.Modules.CompanyEdit = function (pk) {
        require(['Mcompany', 'text!../templates/companyEdit.tmpl'], function (companyEdit, TcompanyEdit) {
            console.info('Mload: company');
            var companyModel = new RES.Models.companyModel({
                id: pk
            });
            var companyViewEdit = new RES.Views.companyViewEdit({
                model: companyModel,
                template: TcompanyEdit
            });
        }); //require
    };

    RES.Modules.Tenders = function () {
        require(['Mtenders',
                'text!../templates/tenders.tmpl'],

            function (tenders, Ttenders) {
                console.info('Mload: tenders');
                var tendersModel = new RES.Models.tendersModel({});
                var tendersView = new RES.Views.tendersView({
                    model: tendersModel,
                    template: Ttenders
                });
                return this;
            }); //require
    };
    RES.Modules.TenderCard = function (pk) {
        require(['Mtender',
                'text!../templates/tenderCard.tmpl'],

            function (tenderCard, TtenderCard) {
                console.info('Mload: tenderCard');
                var tenderCardModel = new RES.Models.tenderCardModel({
                    id: pk
                });
                var tenderCardView = new RES.Views.tenderCardView({
                    model: tenderCardModel,
                    template: TtenderCard
                });
                return this;
            }); //require
    };
    RES.Modules.TendersMyRequests = function () {
        require(['MtendersMyRequests',
                'text!../templates/tendersMyRequests.tmpl'],

            function (tenderMyRequests, TtenderMyRequests) {
                console.info('Mload: tenderMyRequests');
                var tenderMyRequestsModel = new RES.Models.tenderMyRequestsModel({});
                var tenderMyRequestsView = new RES.Views.tenderMyRequestsView({
                    model: tenderMyRequestsModel,
                    template: TtenderMyRequests
                });
                return this;
            }); //require
    };
    RES.Modules.TendersMy = function () {
        require(['MtendersMy',
                'text!../templates/tendersMy.tmpl'],

            function (tendersMy, TtendersMy) {
                console.info('Mload: tendersMy');
                console.log(TtendersMy);
                var tendersMyModel = new RES.Models.tendersMyModel({});
                var tendersMyView = new RES.Views.tendersMyView({
                    model: tendersMyModel,
                    template: TtendersMy
                });
                return this;
            }); //require
    };
    RES.Modules.TenderSendRequests = function (options) {
        require(['Mtenders',
                'text!../templates/tenderSendRequests.tmpl'],

            function (tenderCard, TtenderSendRequests) {
                console.info('Mload: tenderSendRequests');
                var tenderSendRequestsModel = new RES.Models.tenderSendRequestsModel({
                    id: options.pk
                });
                var tenderSendRequestsView = new RES.Views.tenderSendRequestsView({
                    model: tenderSendRequestsModel,
                    template: TtenderSendRequests,
                    insertTag: options.insertTag
                });
                return this;
            }); //require
    };
    RES.Modules.TenderRequestApply = function (options) {
        require(['Mtenders',
                'text!../templates/tenderRequestApply.tmpl'],
            function (tenderCard, TtenderRequestApply) {
                console.info('Mload: tenderRequestApply');
                var tenderRequestApplyModel = new RES.Models.tenderRequestApplyModel({
                    id: options.pk
                });
                var tenderRequestApplyView = new RES.Views.tenderRequestApplyView({
                    model: tenderRequestApplyModel,
                    template: TtenderRequestApply,
                    insertTag: options.insertTag
                });
                return this;
            }); //require
    };

    RES.Modules.TenderDiscurs = function (options) {
        require(['Mtenders',
                'text!../templates/tenderDiscurs.tmpl'],
            function (tenderCard, TtenderDiscurs) {
                console.info('Mload: tenderDiscurs');
                var tenderDiscursModel = new RES.Models.tenderDiscursModel({
                    id: options.pk
                });
                var tenderDiscursView = new RES.Views.tenderDiscursView({
                    model: tenderDiscursModel,
                    template: TtenderDiscurs,
                    insertTag: options.insertTag
                });
                return this;
            }); //require
    };
    RES.Modules.TenderSelectWinners = function (options) {
        require(['Mtenders',
                'text!../templates/tenderSelectWinners.tmpl'],

            function (tenderSelectWinners, TtenderSelectWinners) {
                console.info('Mload: tenderSelectWinners');
                var tenderSelectWinnersModel = new RES.Models.tenderSelectWinnersModel({
                    id: options.pk
                });
                var tenderSelectWinnersView = new RES.Views.tenderSelectWinnersView({
                    model: tenderSelectWinnersModel,
                    template: TtenderSelectWinners,
                    insertTag: options.insertTag
                });
                return this;
            }); //require
    };

    RES.Modules.Slider = function (options) {
        require(['Mslider',
                'text!../templates/slider.tmpl'],

            function (Mslider, Tslider) {
                console.info('Mload: slider');
                var sliderModel = new RES.Models.sliderModel();
                var sliderView = new RES.Views.sliderView({
                    model: sliderModel,
                    template: Tslider,
                    insertTag: options.insertTag
                });
            }); //require
    };


    RES.Modules.TenderCreate = function (options) {
        require(['MtenderCreate',
                'text!../templates/tenderCreate.tmpl'],
            function (tenderCreate, TtenderCreate) {
                console.info('Mload: tenderCreate');
                var tenderCreateModel = new RES.Models.tenderCreateModel({});
                var tenderCreateView = new RES.Views.tenderCreateView({
                    model: tenderCreateModel,
                    template: TtenderCreate,
                    // insertTag: options.insertTag
                });
                return this;
            }); //require
    };
    RES.Modules.Settings = function (options) {
        require(['Msettings',
                'text!../templates/settings.tmpl'],
            function (settings, Tsettings) {
                console.info('Mload: settings');

                var self = RES.Modules.Settings;

                if (self.settingsView) {
                    self.settingsView.render();
                } else {
                    self.settingsView = new RES.Views.settingsView({
                        model: new RES.Models.settingsModel({}),
                        template: Tsettings,
                        tab: options
                        // insertTag: options.insertTag
                    });
                }
                return this;
            }); //require
    };
    RES.Modules.SettingsPersonal = function (options) {
        require(['MsettingsPersonal',
                'text!../templates/settingsPersonal.tmpl',
                'text!../templates/settingsPersonalEdit.tmpl',
                'text!../templates/settingsPersonalPreview.tmpl'],

            function (settingsPersonal, TsettingsPersonal, TsettingsPersonalEdit, TsettingsPersonalPreview) {
                console.info('Mload: settingsPersonal');


                var self = RES.Modules.SettingsPersonal;
                if (self.settingsPersonalView) {
                    self.settingsPersonalView.render();
                } else {
                    self.settingsPersonalView = new RES.Views.settingsPersonalView({
                        model: (new RES.Models.settingsPersonalModel({})),
                        template: {
                            'main': TsettingsPersonal,
                            'edit': TsettingsPersonalEdit,
                            'preview': TsettingsPersonalPreview
                        },
                        mode: options.mode,
                        insertTag: options.insertTag
                    });
                }
                return this;
            }); //require
    };
    RES.Modules.SettingsNotifications = function (options) {
        require(['MsettingsNotifications',
                'text!../templates/settingsNotifications.tmpl'],
            function (settingsNotifications, TsettingsNotifications) {
                console.info('Mload: settingsNotifications');
                var settingsNotificationsModel = new RES.Models.settingsNotificationsModel({});
                var settingsNotificationsView = new RES.Views.settingsNotificationsView({
                    model: settingsNotificationsModel,
                    template: {
                        'main': TsettingsNotifications,
                        // 'preview': TsettingsNotificationsPreview
                    },
                    insertTag: options.insertTag
                });
                return this;
            }); //require
    };

    RES.Modules.SettingsPlan = function (options) {
        require(['MsettingsPlan',
                'text!../templates/settingsPlan.tmpl',
                'text!../templates/tariffItem.tmpl'],

            function (auth, main, tariff) {

                var self = RES.Modules.SettingsPlan;
                if (self.PlanView) {
                    self.PlanView.render();
                } else {
                    self.PlanView = new RES.Views.PlanView({
                        model: new RES.Models.PlanModel(),
                        template: main,
                        templateTariff: tariff
                    });
                }
                return this;
            });//require(['auth-module'], function (companies) {
    };


    RES.Modules.SettingsSecurity = function (options) {
        require(['MsettingsSecurity',
            'text!../templates/changeLockingCompany.tmpl',
            'text!../templates/changeNumberMobile.tmpl',
            'text!../templates/changePassword.tmpl',
            'text!../templates/confirmChangeLockingCompany.tmpl',
            'text!../templates/confirmChangeNumberMobile.tmpl',
            'text!../templates/confirmChangePassword.tmpl',
            'text!../templates/headerSettingSecurity.tmpl'
        ], function (settingsSecurity, TchangeLockingCompany, TchangeNumberMobile, TchangePassword, TconfirmChangeLockingCompany, TconfirmChangeNumberMobile, TconfirmChangePassword, TheaderSetting) {
            console.info('Mload: settingsPersonal');
            var settingsSecurityModel = new RES.Models.settingsSecurityModel({});
            var settingsSecurityView = new RES.Views.settingsSecurityView({
                model: settingsSecurityModel,
                template: {
                    'changeLockingCompany': TchangeLockingCompany,
                    'changeNumberMobile': TchangeNumberMobile,
                    'changePassword': TchangePassword,
                    'confirmChangeLockingCompany': TconfirmChangeLockingCompany,
                    'confirmChangeNumberMobile': TconfirmChangeNumberMobile,
                    'confirmChangePassword': TconfirmChangePassword,
                    'headerSetting': TheaderSetting
                },
                insertTag: options.insertTag
            });
            return this;
        }); //require
    };
    RES.Modules.NotFound = function (options) {
        require(['MnotFound',
                'text!../templates/notFound.tmpl'],
            function (MnotFound, TnotFound) {
                console.info('Mload: notFound');
                console.info(options);
                var notFoundModel = new RES.Models.notFoundModel({});
                var notFoundView = new RES.Views.notFoundView({
                    model: notFoundModel,
                    template: TnotFound,
                });
            }); //require
    };
    
    RES.Modules.manageStaff = function () {
        require(['MmanageStaff', 'text!../templates/manageStaff.tmpl'], function (MmanageStaff, TmanageStaff) {
            console.info('Mload: manageStaff');
            //console.info(options);
            var manageStaffModel = new RES.Models.manageStaffModel({});
            var manageStaffView = new RES.Views.manageStaffView({
                model: manageStaffModel,
                template: TmanageStaff,
            });
            //return this;
        }); //require
    };

    RES.Modules.manageRoles = function () {
        require(['MmanageRoles', 'text!../templates/manageAdd.tmpl', 'text!../templates/manageRoles.tmpl'], function (MmanageRoles, TmanageAdd, TmanageRoles) {
            console.info('Mload: manageRoles');
            //console.info(options);
            var manageRolesModel = new RES.Models.manageRolesModel({});
            var manageRolesView = new RES.Views.manageRolesView({
                model: manageRolesModel,
                template: {
                    'add': TmanageAdd,
                    'roles': TmanageRoles
                }
            });

            //return this;
        }); //require
    };

    RES.Modules.ServerError = function (options) {
        require(['MserverError',
                'text!../templates/serverError.tmpl'],
            function (MserverError, TserverError) {
                console.info('Mload: serverError');
                console.info(options);
                var serverErrorModel = new RES.Models.serverErrorModel({});
                var serverErrorView = new RES.Views.serverErrorView({
                    model: serverErrorModel,
                    template: TserverError,
                });
            }); //require
    };

    RES.Modules.fileUpload = function(){
        require(['MfileUpload',
                'text!../templates/fileUpload.tmpl'],
            function(MfileUpload, TfileUpload){
                console.info('Mload: fileUpload');
                var fileUploadModel = new RES.Models.fileUploadModel({});
                var fileUploadView = new RES.Views.fileUploadView({
                    model: fileUploadModel,
                    template: TfileUpload,
                });
            });
    };

    moduleCollections = RES.Modules;
    console.info('moduleCollections.js-LOADED==============================================');
    return moduleCollections;

})
;//#helpers-----------------------------------------------------------