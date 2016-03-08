/**
 * Created by noonon on 9/3/15.
 */
define('Mdocs', function (auth) {
    RES.Models.docsModel = Backbone.Model.extend({

        defaults: {
            app: '',
            name: '',
            link: '',
            size: ''
        }

    });
    RES.Views.docsView = Backbone.View.extend({
        el: "#insert",

        initialize: function (options) {
            this.options = options;
            this.templateFromUrl = options.template;
            this.render();
            this.stopLoader();
        },
        render: function (options) {

            var collection = this.collection.toJSON(), docs;
            collection = _.groupBy(collection, function (model) {

                return model.app;
            });

            docs = (_.pick(collection, ''))[''];
            collection = _.omit(collection, '');

            console.log({collection: collection, docs: docs});


            var tmpl = _.template(this.templateFromUrl);
            var html = tmpl({collection: collection, docs: docs});
            this.$el.html(html);
            return this;
        },
        stopLoader: function () {
            $('.loaderWrapper').removeClass('on');
        }
    });

    RES.Collections.docsCollection = Backbone.Collection.extend({
        model: RES.Models.docsModel
    })

});