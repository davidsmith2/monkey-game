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
        initialize: function (offset) {
            this.on('monkey:move', this.onMove, this);
            this.on('monkey:moved', this.onMoved, this);
        },
        onBeforeMove: function (keyCode, container) {
            var offset = parseInt(this.$el.css('left'), 10),
                stride = this.model.get('stride');
            if (keyCode === 37) {
                offset = offset - stride;
            }
            if (keyCode === 39) {
                offset = offset + stride;
            }
            if (this.monkeyCanMove(offset, container)) {
                this.trigger('monkey:move', offset, container);
            }
        },
        onMove: function (offset, container) {
            this.$el.css('left', offset + 'px');
            this.trigger('monkey:moved', parseInt(this.$el.css('left'), 10), container);
        },
        onMoved: function (offset, container) {
            if (this.monkeyHasFinished(offset, container)) {
                this.trigger('monkey:finished');
            }
        },
        monkeyCanMove: function (offset, container) {
            return (offset > -1) && ((this.$el.width() + offset) < container.$el.width());
        },
        monkeyHasFinished: function (offset, container) {
            return (container.$el.width() - offset) < (this.$el.width() + this.model.get('stride'));
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