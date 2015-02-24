(function ($, _, Backbone, Marionette) {

    var App = new Marionette.Application();

    var ContainerView = Marionette.ItemView.extend({
        template: false,
        el: '#container',
        events: {
            'keydown': 'onKeydown'
        },
        initialize: function () {
            this.$el.attr('tabindex', -1).focus();
        },
        onKeydown: function (e) {
            if (e.keyCode === 39) {
                this.trigger('monkey:move');
            }
        }
    });

    var MonkeyView = Marionette.ItemView.extend({
        template: false,
        el: '#monkey',
        move: function () {
            var left = parseInt(this.$el.css('left'), 10) + 96;
            this.$el.css('left', left + 'px');
        }
    });

    var containerView = new ContainerView();

    var monkeyView = new MonkeyView();

    monkeyView.listenTo(containerView, 'monkey:move', monkeyView.move);

})(jQuery, _, Backbone, Marionette);