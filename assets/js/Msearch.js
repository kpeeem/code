define('Msearch', function (search) {

    /* Views ########################################################################*/
    RES.Views.searchWidgetView = Backbone.View.extend({

        el: "#res-header-search",

        events: {
            'click #res-search-filter > span': 'openFilter',
            'click .res-header-search': 'openSearch',
            'keyup .res-search-input input': 'addSearchInput',
            'focusin .res-search-input input': 'searchFocus',
            'focusout .res-search-input input': 'searchFocus',
            'click .res-search-company-element': 'openCompanyCard',
            'click .res-search-deal-element': 'openDealCard',
            'click .res-search-tender-element': 'openTenderCard',
            'click .res-search-response-company .res-search-response-header a': 'openAllCompanies',
            'click .res-search-response-tender .res-search-response-header a': 'openAllTenders',

        },

        searchActive: false,
        wait: true,
        flagOpenSearchPause: false,

        funcOpenSearchPause: function () {
            var that = this;

            this.flagOpenSearchPause = true;

            setTimeout(function () {
                that.flagOpenSearchPause = false;
            }, 500)
        },


        openFilter: function (event) {

            var active = $('.res-header-filter').hasClass('res-active'),
                isSearch = $('.res-header-search.res-active').length;

            if (this.flagOpenSearchPause) {
                return false;
            }


            if (active) {
                $(document).trigger('click');
            } else {
                var text = this.model.get('text'),
                    filter = this.filterView.$el;

                if (isSearch) {
                    this.fadeOutSearch(true)
                } else {
                    $('.res-filter').fadeIn();
                }

                if (text) {
                    $('.res-search').fadeOut();
                }

                this.funcOpenSearchPause();
                //this.fadeOutSearchElements({search: true});
                this.veilOn();

                filter.addClass('res-active');
                filter.find(".res-select-slide").slideDown();

            }

            event.stopPropagation();
            return false;

        },

        openSearch: function (event) {

            var isFilter = $('.res-header-filter.res-active').length;

            if (this.flagOpenSearchPause) {
                return false;
            }

            if (this.searchActive) {
                $(document).trigger('click');
            } else {

                var $resSearch = this.$el.find('.res-search');

                $('.res-header-search ').addClass('res-active');

                if (isFilter) {
                    this.fadeOutFilter(true)
                } else {
                    $resSearch.fadeIn(function () {
                        $resSearch.find('.res-search-response').fadeIn();
                    });
                    this.veilOn();
                }

                this.searchActive = true;

                this.funcOpenSearchPause();
                this.openEmptyResponse()
            }

            return false;
        },


        /*
         fadeOutSearchElements: function (searchElements) {

         var filter = this.filterView.$el,
         searchHeader = $('.res-header-search ');

         if (searchElements.filter) {
         filter.stop().fadeOut();
         } else if (searchElements.search) {
         searchHeader.stop().fadeOut();
         }

         },

         fadeInSearchElements: function () {
         var filter = this.filterView.$el,
         searchHeader = $('.res-header-search ');

         if (filter.is(':visible')) {
         searchHeader.stop().fadeIn();
         } else if (searchHeader.is(':visible')) {
         filter.stop().fadeIn();
         }
         },
         */

        //veil to div
        veilOn: function () {

            var that = this;

            $('header').addClass('res-header-white-veil');

            $(document).on('click.resHeaderVeilOn', (function (event) {
                that.closeHeaderElement(event);
            }));

        },

        closeHeaderElement: function (event) {

            var resFilterSelectSlide = $(event.target).closest(".res-select-slide").length,
                resSearch = $(event.target).closest(".res-search").length,
                resFilterApply = $(event.target).closest("#res-filter-apply").length;

            //do nothing, when was click on search input and filter.
            if (resSearch == 0 && !(this.flagOpenSearchPause) &&
                (resFilterApply == 1 || resFilterSelectSlide == 0)) {

                this.funcOpenSearchPause();

                $('header.res-header-white-veil').removeClass("res-header-white-veil");

                this.fadeOutFilter();
                this.fadeOutSearch();

                $(document).off('.resHeaderVeilOn');
                event.stopPropagation()
            }
        },

        fadeOutFilter: function (toggle) {

            var $resFilterIcon = $('#res-search-filter'),
                $Filter = $('.res-filter'),
                $resSearch = $('.res-search');

            if ($resFilterIcon.is(':visible')) {

                $Filter.fadeOut(function () {
                    if (toggle) {
                        $resSearch.fadeIn(function () {
                            $resSearch.find('.res-search-response').fadeIn();
                        });
                    }
                });
                $resFilterIcon.find(".res-select-slide").slideUp();
                $resFilterIcon.removeClass('res-active');
                this.filterCatalog();
            }
        },

        fadeOutSearch: function (toggle) {
            var $resSearch = $('.res-search'),
                text = this.model.get('text'),
                $Filter = $('.res-filter'),
                funcFilterFadeIn = (function () {
                    if (toggle) {
                        $Filter.fadeIn();
                    }
                });

            //TODO-front refactor all hasclass of elements to flags in view
            this.searchActive = false;

            if (text) {
                if ($resSearch.is(':visible')) {
                    //if we have text in search`s input and search is visible, then search`s detected data hidden
                    $resSearch.find('.res-search-response').fadeOut(funcFilterFadeIn);
                    $('.res-header-search ').removeClass('res-active');
                } else {
                    //we hide search`s detected data with class and fadein search input
                    $resSearch.find('.res-search-response').addClass('res-header-search-hidden');
                    $resSearch.fadeIn();
                }
            } else if ($resSearch.is(':visible')) {
                //if there is no text in search`s input, hide input
                $resSearch.fadeOut(funcFilterFadeIn);
                $('.res-header-search ').removeClass('res-active');
            }
        },

        openEmptyResponse: function () {

            var text = $('.res-search input').val(),
                $responseEmpty = $('.res-search-response-empty'),
                $responseElements = $('.res-search-response-deal, .res-search-response-tender, .res-search-response-company');

            if (text && $responseEmpty.is(':visible')) {
                $responseEmpty.fadeOut(function () {
                    $responseElements.fadeIn();
                });
            } else if (!text && $responseElements.is(':visible')) {
                $responseElements.fadeOut(function () {
                    $responseEmpty.fadeIn();
                });
            }
        },

        openAllTenders: function (event) {
            this.getRequestToAllSearched('/tenders?');
            event.preventDefault();
        },

        openAllCompanies: function (event) {
            this.getRequestToAllSearched('/deals?');
            event.preventDefault();
        },

        getRequestToAllSearched: function (path) {

            var text = this.model.get('cache_text'),
                categories = this.model.get('cache_categories'),
                params = $.param({text: text, categories: categories});

            window.location = path + params;
        },

        openTenderCard: function (event) {
            var id = $(event.currentTarget).attr('tender_id');

            window.location = '/tender/' + id;
        },

        openDealCard: function (event) {

            var id = $(event.currentTarget).attr('deal_id');

            window.location = '/deal/' + id;
        },

        openCompanyCard: function (event) {
            var id = $(event.currentTarget).attr('company_id');
            window.location = '/company/' + id;
        },

        searchFocus: function (event) {

            var searchInput = $(event.currentTarget),
                searchValue = searchInput.val(),
                searchIputField = searchInput.closest(".res-search-input");

            searchIputField.toggleClass('res-focus');

            if (event.type == 'focusin') {
                searchIputField.addClass('res-focus');
                searchIputField.removeClass('res-unfocus');

                if (!$('header').hasClass('res-header-white-veil')) {
                    this.openSearch();
                }

            } else if (searchValue) {
                searchIputField.removeClass('res-focus');
                searchIputField.addClass('res-unfocus');
            }


        },

        addSearchInput: function (event) {

            var inputValue = $.trim($(event.currentTarget).val());

            this.model.set({'text': inputValue}, {validate: true});

        },


        addSearchResult: function () {

            var $resSearchResponse = $('.res-search .res-search-response'),
                text = $('.res-search input').val();

            if (text) {

                //this.addSearchDeals();
                this.addSearchTenders();
                this.addSearchCompanies();

            } else {
                this.openEmptyResponse()
            }

            $resSearchResponse.removeClass('res-load');

        },

        addSearchData: function () {
            var that = this,
                text = this.model.get('text');

            //If del
            that.openEmptyResponse();

            if (this.wait && text) {
                this.wait = false;
                setTimeout(function () {

                    that.wait = true;

                    //when text is empty after 1000ms
                    if (!text) {
                        return
                    }

                    that.model.set('cache_text', that.model.get('text'));
                    that.model.set('cache_categories', that.model.get('categories'));

                    $('.res-search .res-search-response').addClass('res-load');

                    /*TODO-front Send fetch with attr text*/
                    that.model.set('companies', {
                        "count": "24",
                        "items": [
                            {
                                "id": "company_id",
                                "name": "My_company1",
                                "category": "1",
                                "link": "www.mycompany.io",
                                "find": [
                                    {"where": "Источник", "text": "Текст"},
                                    {"where": "Источник", "text": "Текст"}
                                ]
                            },
                            {
                                "id": "company_id",
                                "name": "My_company1",
                                "category": "2",
                                "link": "www.mycompany.io",
                                "find": [
                                    {"where": "Источник", "text": "Текст"},
                                    {"where": "Источник", "text": "Текст"}
                                ]
                            },
                            {
                                "id": "company_id",
                                "name": "My_company1",
                                "category": "3",
                                "link": "www.mycompany.io",
                                "find": [
                                    {"where": "Источник", "text": "Текст"},
                                    {"where": "Источник", "text": "Текст"}
                                ]
                            }
                        ]
                    });
                    that.model.set('tenders', {
                        "count": "24",
                        "items": [
                            {
                                "id": "company_id",
                                "name": "My_company1",
                                "category": "1",
                                "link": "www.mycompany.io",
                                "find": [
                                    {"where": "Источник", "text": "Текст"},
                                    {"where": "Источник", "text": "Текст"}
                                ]
                            },
                            {
                                "id": "company_id",
                                "name": "My_company1",
                                "category": "2",
                                "link": "www.mycompany.io",
                                "find": [
                                    {"where": "Источник", "text": "Текст"},
                                    {"where": "Источник", "text": "Текст"}
                                ]
                            },
                            {
                                "id": "company_id",
                                "name": "My_company1",
                                "category": "3",
                                "link": "www.mycompany.io",
                                "find": [
                                    {"where": "Источник", "text": "Текст"},
                                    {"where": "Источник", "text": "Текст"}
                                ]
                            }
                        ]
                    });

                    setTimeout(function () {
                        that.model.trigger('sync', that.model, {some: 'data'}, {options: 'data'});
                    }, 1000);
                    /**/
                }, 1000)
            }
        },

        filterCatalog: function (event) {
            console.log('отфильтровали каталог');
        },

        initialize: function (options) {
            $('.head-elements').show();

            this.isSubView = options.isfilter;

            this.template = _.template(options.template);
            this.models = options.models;
            this.child_views = options.child_views;
            this.templates_search_response = options.templates_search_response;

            this.render();

            this.filter_collection = new options.child_collections['Filter']();

            //subView
            if (this.isSubView) {
                this.filterView = new this.child_views['Filter']({
                    collection: this.filter_collection,
                    template: options.filter_template,
                    parentView: this
                })
            }


            this.model.bind('change:text', this.addSearchData, this);
            this.model.bind('change:categories', this.addSearchData, this);
            //this.model.bind('change:categories', this.addIconsInHeaderFilter, this);
            this.model.bind('sync', this.addSearchResult, this);


        },


        addSearchTenders: function () {

            var tender = this.model.get('tenders'),
                $tender = this.$el.find('.res-search-response-tender');

            if (!_.isEmpty(tender)) {

                tender = _.template(this.templates_search_response)({
                    name: 'Тендеры',
                    itemName: 'res-search-tender-element',
                    founded: tender,
                    categoriesIcons: RES.Env.categoriesIcons
                });
                $tender.html(tender);
                $tender.fadeIn();

            }

        },

        addSearchCompanies: function () {
            var companies = this.model.get('companies'),
                $company = this.$el.find('.res-search-response-company');

            if (!_.isEmpty(companies)) {

                companies = _.template(this.templates_search_response)({
                    name: 'Компании',
                    itemName: 'res-search-company-element',
                    founded: companies,
                    categoriesIcons: RES.Env.categoriesIcons
                });
                $company.html(companies);
                $company.fadeIn();

            }

        },


        render: function (options) {
            this.$el.html(this.template({isSubView: this.isSubView}));
            return this;
        }
    });

    RES.Views.searchWidgetFilterView = Backbone.View.extend({
        el: "#res-search-filter",

        header_templates: {
            icon: "<span class='res-select-icon <% print(icon) %>'></span>"
        },

        events: {

            'click .res-filter li': 'searchCategory',
            'click #res-filter-clear-all': 'clearFilter',
            'click #res-filter-apply': 'applyCatalog'
        },

        applyCatalog: function (event) {
            this.parentView.closeHeaderElement(event);
            return false;
        },

        clearFilter: function () {
            $('.res-select-slide li.res-active').removeClass('res-active');
            this.parentView.model.set('categories', []);
        },

        disableCategory: function () {
            var categoriesLength = this.parentView.model.get('categories').length,
                disabledCategories = $('.res-select-slide ul li').not('.res-active');

            if (categoriesLength == 3) {
                disabledCategories.addClass('res-disabled')
            } else {
                disabledCategories.removeClass('res-disabled')
            }

        },

        renderHeaderOfFilter: function () {

            var categories = this.parentView.model.get('categories'),
                $workzoneDefault = this.$el.find('.res-select-header-workzone-default'),
                $workzone = this.$el.find('.res-select-header-workzone'),
                $filter = this.$el;


            if (categories.length > 0) {
                var htmlOfIconsOfSelectedCategories = _.map(categories, function (element) {
                    return _.template(this.header_templates.icon)({icon: RES.Env.categoriesIcons[element]});
                }, this);

                htmlOfIconsOfSelectedCategories = htmlOfIconsOfSelectedCategories.join('');


                //Check that it is first category and we need hide default zone
                if ($workzoneDefault.is(":visible")) {
                    $workzoneDefault.fadeOut("fast", "swing", function () {
                        $workzone.html(htmlOfIconsOfSelectedCategories).fadeIn();
                    });
                } else {
                    $workzone.html(htmlOfIconsOfSelectedCategories);
                }

                $filter.addClass('res-categories-selected');

            } else {
                $workzone.fadeOut("fast", "swing", function () {
                    $workzoneDefault.fadeIn();
                });

                $filter.removeClass('res-categories-selected');

            }

            this.disableCategory();


        }
        ,

        searchCategory: function (event) {

            var $element = $(event.currentTarget),
                elementClass = $element.hasClass('res-active'),
                elementID = $element.attr('category_id'),
                arrayCategories = _.clone(this.parentView.model.get('categories'));

            if (elementClass) {
                arrayCategories = _.without(arrayCategories, elementID);
                $element.removeClass('res-active');

            } else if (arrayCategories.length < 3) {
                arrayCategories.push(elementID);
                arrayCategories = _.uniq(arrayCategories);
                $element.addClass('res-active');
            }

            this.parentView.model.set('categories', arrayCategories);

        }
        ,

        initialize: function (options) {
            this.template = _.template(options.template);
            this.collection = options.collection;
            this.parentView = options.parentView;
            this.collection.bind('sync', this.render, this);

            this.parentView.model.bind('change:categories', this.renderHeaderOfFilter, this);

            this.collection.fetch();
        }
        ,
        render: function (options) {

            this.$el.html(
                this.template({
                    collection: this.collection.toJSON(), categoriesIcons: RES.Env.categoriesIcons
                }));
            return this;
        }
    });

    /* Models #######################################################################*/

    RES.Models.searchWidgetModel = Backbone.Model.extend({

        validate: function (attrs, options) {
        },

        defaults: {
            //send
            text: '',
            categories: [],

            //cache data

            cache_text: '',
            //cache_categories: '',

            //response
            companies: {},
            tenders: {},
            deals: {}
        }
    });

    RES.Models.searchWidgetFilterModel = Backbone.Model.extend({
        initialize: function () {
            this.on('change', function () {
            });
        },


        defaults: {}

    });

    /* Collections ##################################################################*/
    RES.Collections.searchWidgetFilterCollection = Backbone.Collection.extend({
        url: 'api/categories_list/',
        model: RES.Models.searchWidgetFilterModel
    });

    return RES;


});
