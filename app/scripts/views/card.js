/*global Memory, Backbone, JST*/

Memory.Views = Memory.Views || {};

(function () {
    'use strict';

    Memory.Views.Card = Backbone.View.extend({

        template: JST['app/scripts/templates/card.ejs'],

        tagName: 'div',

        className: 'card',

        events: {
            'click': 'uncoverCard'
        },

        uncoveredCardsCounter: 0,

        isUncovered: false, 

        incrementUncoveredCardsCounter: function(){
          this.uncoveredCardsCounter += 1; 
        },

        removeUncoveredCard: function(){
          if (this.isUncovered) {
            this.$el.css('visibility', 'hidden');
            this.model.set('isMatched', true); 
            this.isUncovered = false; 
            Memory.Events.trigger('UnuncoveredCardEvent');
          } 
        },

        recoverUncoveredCard: function(){
          this.$('.card_value').css('color', 'black');
          this.isUncovered = false; 
          Memory.Events.trigger('UnuncoveredCardEvent');
          
        },

        decrementUncoveredCardsCounter: function(){
          this.uncoveredCardsCounter -= 1; 
        },

        uncoverCard: function(){
          if ((this.uncoveredCardsCounter < 2) &&
            !this.isUncovered){
            Memory.Events.trigger('UncoveredCardEvent', this.model.toJSON());
            this.$('.card_value').css('color', 'white');
            this.isUncovered = true; 
          };
        },

        initialize: function () {
          this.listenTo(Memory.Events, 'UnuncoveredCardEvent', this.decrementUncoveredCardsCounter); 
          this.listenTo(Memory.Events, 'UncoveredCardsMatchEvent', this.removeUncoveredCard); 
          this.listenTo(Memory.Events, 'UncoveredCardsDoNotMatchEvent', this.recoverUncoveredCard);
          this.listenTo(Memory.Events, 'UncoveredCardAddedEvent', this.incrementUncoveredCardsCounter);
        },



        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this; 
        }

    });

})();
