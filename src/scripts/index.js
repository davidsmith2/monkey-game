(function ($, _, Backbone, Marionette) {

    var App = new Marionette.Application();

    var ContainerView = Marionette.ItemView.extend({
        template: false,
        el: '#main',
        events: {
            'keydown': 'onKeydown'
        },
        initialize: function () {
            this.$el.attr('tabindex', -1).focus();
        },
        onKeydown: function (e) {
            this.trigger('monkey:move', e.keyCode);
        }
    });

    var MonkeyView = Marionette.ItemView.extend({
        template: false,
        el: '#monkey',
        move: function (keyCode) {
            var offset;
            if (keyCode === 37) {
                offset = parseInt(this.$el.css('left'), 10) - 96;
            }
            if (keyCode === 39) {
                offset = parseInt(this.$el.css('left'), 10) + 96;
            }
            this.$el.css('left', offset + 'px');
        }
    });

    var containerView = new ContainerView();

    var monkeyView = new MonkeyView();

    monkeyView.listenTo(containerView, 'monkey:move', monkeyView.move);

})(jQuery, _, Backbone, Marionette);