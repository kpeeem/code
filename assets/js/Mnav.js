/**
 * Created by noonon on 9/3/15.
 */
define('Mnav', function () {
    RES.Models.navModel = Backbone.Model.extend({
        defaults: {
            'auth': {
                account: {
                    type: 'toggle',
                    name: 'Кабинет',
                    items: {
                        calendar: 'Календарь',
                        settings: 'Настройки',
                        workers: 'Сотрудники и роли',
                        logout: 'Выход'

                    }
                },
                accounting: {
                    type: 'toggle',
                    name: 'Бухгалтерия',
                    items: {
                        requisitesMy: 'Карточка компании',
                        transactions: 'Транзакции',
                        docs: 'Документооборот',
                        howTo: 'Как это работает',
                        reports: 'Ежекварталка'
                    }
                },
                bizness: {
                    type: 'toggle',
                    name: 'Бизнес',
                    items: {
                        mycompany: 'Моя компания',
                        mydeals: 'Мои сделки',
                        tendersMy: 'Мои тендеры',
                        tendersMyRequest: 'Заявки на тендеры'
                    }
                },
                notifications: 'Уведомления'


            }

            /*'unauth': {
             'registration': {
             name: 'Регистрация',

             }
             }*/
            /*TODO-front list of links*/
        }
    });
    RES.Views.navView = Backbone.View.extend({
        el: '#res-header-navigation',

        events: {
            'click .res-navigation-link': 'linkToAnotherRouter'
        },
        initialize: function (options) {
            this.navModel = this.model;
            this.options = options;
            this.templates = options.templates;
            this.render();
            Backbone.history.on('route', this.placePoint, this);
        },
        customLinks: {
            logout: function () {
            $.ajax({    //TODO-front make this.model.destroy
                        //           write auth requests module
                    url: '/api/auth',
                    type: 'DELETE',
                    success: function(result) {
                        Backbone.history.navigate('auth', true);
                    }
                });
            }
        },

        linkToAnotherRouter: function (event) {
            var target = $(event.currentTarget),
                name = target.attr('name'),
                routes = Router.routes, url;
            if (typeof this.customLinks[name] == 'function') {
                (this.customLinks[name]).apply(this);
            } else {

                url = _.findKey(routes, function (route) {
                    return route === name;
                });
                url = url.split('(')[0]; // without params

                Router.navigate(url, {trigger: true, replace: true});
            }

        },

        placePoint: function (event, name) {
            console.log(event);

            var activeElement = '[name = "' + name + '"]';

            activeElement = this.$el.find(activeElement);

            this.$el.find('.res-active').removeClass('res-active');

            if (name == undefined) {
                return
            }

            console.log(activeElement.closest('.res-header-nav-dropdown-toggle'));

            activeElement.addClass('res-active');

            //color of parent toggle element
            if(activeElement.hasClass('res-navigation-children-toggle-element')){
                activeElement.closest('.dropdown').addClass('res-active');
            }



        },

        render: function () {
            var model = this.model.toJSON(), html = '';

            /*TODO-front if auth*/
            model = model.auth;
            /**/

            _.each(model, function (item, key) {

                if (item.type == 'toggle') {

                    html += _.template(this.templates.Tnav_toggle)(item);

                } else {

                    html += _.template(this.templates.Tnav)({item: item, key: key});

                }
            }, this);

            this.$el.html(html);

            //emulation events attrs
            this.placePoint(Router, Router.routes[Backbone.history.getFragment()]);

        },

        initialize: function (options) {

            this.options = options;
            this.templates = options.templates;

            this.render();

            Backbone.history.on('route', this.placePoint, this);

        }
    });
});
