(function ($, _, Backbone, Marionette) {

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
            this.trigger('monkey:beforeMove', e.keyCode, this);
        }
    });

    var MonkeyView = Marionette.ItemView.extend({
        template: false,
        el: '#monkey',
        stride: 124,
        initialize: function (offset) {
            this.on('monkey:move', this.onMove, this);
            this.on('monkey:moved', this.onMoved, this);
        },
        onBeforeMove: function (keyCode, container) {
            var offset;
            if (keyCode === 37) {
                offset = parseInt(this.$el.css('left'), 10) - this.model.get('stride');
            }
            if (keyCode === 39) {
                offset = parseInt(this.$el.css('left'), 10) + this.model.get('stride');
            }
            if (offset > -1 && (this.$el.width() + offset) < container.$el.width()) {
                this.trigger('monkey:move', offset, container);
            }
        },
        onMove: function (offset, container) {
            this.$el.css('left', offset + 'px');
            this.trigger('monkey:moved', parseInt(this.$el.css('left'), 10), container);
        },
        onMoved: function (offset, container) {
            if ((container.$el.width() - offset) < (this.$el.width() + this.model.get('stride'))) {
                this.trigger('monkey:finished');
            }
        }
    });

    var ModalView = Marionette.ItemView.extend({
        template: false,
        el: '#modal',
        open: function () {
            this.$el.modal();
        }
    });

    var containerView = new ContainerView();

    var monkeyView = new MonkeyView({model: new Backbone.Model({stride: 124})});

    var modalView = new ModalView();

    monkeyView.listenTo(containerView, 'monkey:beforeMove', monkeyView.onBeforeMove);

    modalView.listenTo(monkeyView, 'monkey:finished', modalView.open);

})(jQuery, _, Backbone, Marionette);