define('Mcompanies', function (companies) {
    //#Models##########################################################
    console.info('companiesModule-LOADED===============================================');

    RES.Models.companiesModel = Backbone.Model.extend({
        url: "/api/companies/",
        initialize: function () {
            console.info("init: Model companies");
            this.on('change', function () {
            });
        },
        defaults: function () {
            return {
                results: {
                    "page": "2",
                    "nextPage": "3",
                    "prevPage": "1",
                    "countPages": "5",
                    "company": [
                        {
                            "id": "1",
                            "urlCompany": "weqweqew",
                            "logo": "/img/1.jpg",
                            "name": "kqwqweqwe",
                            "shotDescription": "loqweqweqweqweqweqwe",
                            "site": "www.hbhhk.com",
                            "statusDeal": true,
                            "owner": false,
                            "tags": [
                                "ewrwre",
                                "dss23rwedffds",
                                "we234",
                                "werw"
                            ]
                        },
                        {
                            "id": "2",
                            "urlCompany": "weqweqew",
                            "logo": "/img/2.jpg",
                            "name": "23423423423",
                            "shotDescription": "lqweqweqweqweqweqo",
                            "site": "www.hbhhk.com",
                            "statusDeal": false,
                            "owner": true,
                            "tags": [
                                "добыча",
                                "dssdffds",
                                "sdfwer",
                                "авто"
                            ]
                        }
                    ]
                }
            }
        }
    });

//#View###########################################################

//companiesView
    RES.Views.companiesView = Backbone.View.extend({
        el: "#insert",
        initialize: function (options) {
            // this.render();
            this.options = options;
            this.templateFromUrl = options.template;
            this.model.bind('change', this.render, this);
            this.model.bind("error", this.error);
            this.model.bind("all", this.allEventDebug);
            //this.model.fetch();
            this.render();
        },
        allEventDebug: function (e) {

            console.log("event viewCompanies:" + e);
            //console.log('redirectToCompany');
        },
        error: function (model, error) {
            console.log("error viewCompanies:" + error);
        },
        render: function (options) {
            console.log("render view companies ################");
            console.log(this.model.toJSON());
            console.log("render view companies ################");
            var data = this.model.toJSON();
            var tmpl = _.template(this.templateFromUrl);
            var html = tmpl(this.model.toJSON());
            //console.log(this.model.toJSON());
            this.$el.html(html);

            var $container = $('.companies-scope');
            // init
            $container.packery({
                itemSelector: '.carditem',

            });
            RES.Utils.tagsSeparation();
            RES.Utils.randomBackground();

            $(".companies-scope .card[href]").on('click', function (e) {
                var sel = getSelection().toString();
                if (e.target.tagName != "Ae" && !sel) {
                    Backbone.history.navigate($(this).attr('href'), true);
                }
            });

            return this;
        }
    });


//#Collections#################################################
// RES.Collections.CollectionsOfModels = Backbone.Collection.extend({
//     model: RES.Models.companies,
//     url: "/api/companies/"
// });
    console.info('companiesModule-LOADED===============================================');
    return RES

})
; //define('companiesModule', function () {
