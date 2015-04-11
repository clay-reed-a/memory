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
          var that = this; 
          if (this.isUncovered) {
            this.$el.css('background-color', 'white');
            this.$('.card_value').css('color', 'white');
            setTimeout(function(){
              that.$el.css('visibility', 'hidden');
            }, 1000);
            this.model.set('isMatched', true); 
            this.isUncovered = false; 
            Memory.Events.trigger('UnuncoveredCardEvent');
          } 
        },

        recoverUncoveredCard: function(){
          var that = this; 
          if (this.isUncovered){
            this.$('.card_value').css('color', 'black');
            setTimeout(function(){
              that.$('.card_value').css('display', 'none');
            }, 1000);
            this.isUncovered = false; 
            Memory.Events.trigger('UnuncoveredCardEvent');
          }    
        },

        decrementUncoveredCardsCounter: function(){
          this.uncoveredCardsCounter -= 1; 
        },

        uncoverCard: function(){
          var that = this; 

          if (this.$gameHeader.css('color') === 'rgb(0, 0, 0)'){
            
            this.$gameHeader.css('color', 'white');
            setTimeout(function(){
              that.$gameHeader.css('visibility', 'hidden');
            }, 1000);
          }
          
          
          if ((this.uncoveredCardsCounter < 2) &&
            !this.isUncovered){
            Memory.Events.trigger('UncoveredCardEvent', this.model.toJSON());
            this.$('.card_value').css('display', 'block');
            setTimeout(function(){
              that.$('.card_value').css('color', 
                that.model.get('cardColor'));
            }, 250);
            this.isUncovered = true; 
          };
        },

        initialize: function () {
          this.$gameHeader = $('header h1');
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
