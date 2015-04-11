/*global Memory, Backbone, JST*/

Memory.Views = Memory.Views || {};

(function () {
    'use strict';

    Memory.Views.Board = Backbone.View.extend({

      template: JST['app/scripts/templates/board.ejs'],

      tagName: 'div',

      id: '',

      className: 'board',

      events: {},

      uncoveredCards: [], 

      resetUncoveredCards: function(){
        this.uncoveredCards = [];
      },

      addUncoveredCard: function (cardObj) {
        this.uncoveredCards.push(cardObj);
        Memory.Events.trigger('UncoveredCardAddedEvent');
        if (this.uncoveredCards.length === 2){
          this.testIfMatch(); 
        }
      },

      recoverCards: function(){
        this.$('.card_value').css('color', 'black');
      },

      testIfMatch: function(){
        var that = this; 

        var letters = _.pluck(this.uncoveredCards, 'cardValue');
        if (_.uniq(letters).length === 1) {
          setTimeout(function(){
            Memory.Events.trigger('UncoveredCardsMatchEvent'); 
            that.resetUncoveredCards();
            setTimeout(function(){
              that.seeIfWon();
            }, 1000);
          }, 1000);
        } else {
          setTimeout(function(){
            Memory.Events.trigger('UncoveredCardsDoNotMatchEvent');
            that.resetUncoveredCards();
          }, 1250);
        }; 
      },

      seeIfWon: function(){
        if (_.every(this.collection.models, function(model){
          return model.get('isMatched');
        })) {
          
          $('header h1').text('You remembered!')
            .css('color', 'black')
            .css('visibility', 'visible')
            .css('margin-top', '2em');

            setTimeout(function(){
              window.location.reload(false);
            }, 1500);

        } 
      },

      initialize: function () {
        this.listenTo(Memory.Events, 'UncoveredCardEvent', this.addUncoveredCard);
      },

      render: function () {
        var that = this; 
        this.$el.html(this.template());

          _.each(_.shuffle(this.collection.models), function(card){
            var cardView = new Memory.Views.Card({model: card});
            that.$('.cards').append(cardView.render().$el);
          });

        return this; 
      }

    });

})();
