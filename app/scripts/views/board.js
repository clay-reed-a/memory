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
      moves: 0, 

      resetUncoveredCards: function(){
        this.uncoveredCards = [];
      },

      addUncoveredCard: function (cardObj) {
        this.uncoveredCards.push(cardObj);
        Memory.Events.trigger('UncoveredCardAddedEvent');
        if (this.uncoveredCards.length === 2){
          this.moves += 1; 
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
            }, 750);
          }, 750);
        } else {
          setTimeout(function(){
            Memory.Events.trigger('UncoveredCardsDoNotMatchEvent');
            that.resetUncoveredCards();
          }, 1000);
        }; 
      },

      seeIfWon: function(){
        var that = this; 
        if (_.every(this.collection.models, function(model){
          return model.get('isMatched');
        })) {
          
          $('header h1').text('You remembered!')
            .css('color', 'black')
            .css('visibility', 'visible')
            .css('margin-top', '2em');
          console.log('You won in '+this.moves+' moves!');
          setTimeout(function(){
            that.render();
            $('header h1').text('Memory')
              .css('margin-top', '0');
          }, 1500);

        } 
      },

      initialize: function () {
        this.listenTo(Memory.Events, 'UncoveredCardEvent', this.addUncoveredCard);
      },

      createCards: function(){
        var allLetters = [
            'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η',
            'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 
            'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 
            'χ', 'ψ', 'ω'
        ], 
                // r, o, y, g, b, p 
            colors = ['#FC1501', '#FF7F00', '#FFE600', 
                      '#0e1', '#0BB5FF', '#C0F'];

        var letters = _.sample(allLetters, 6), 
            cards = new Memory.Collections.Cards();

        _.each(letters, function(letter, idx){
          var attrs         = {cardValue: letter,
                                 cardColor: colors[idx]}; 
          var cardPairFirst = new Memory.Models.Card(attrs),  
             cardPairSecond = new Memory.Models.Card(attrs);
            
          cards.add([cardPairFirst, cardPairSecond]);
        });

        this.collection = cards; 

      },

      render: function () {
        var that = this; 

        this.createCards();

        this.$el.html(this.template());

          _.each(_.shuffle(this.collection.models), function(card){
            var cardView = new Memory.Views.Card({model: card});
            that.$('.cards').append(cardView.render().$el);
          });

        return this; 
      }

    });

})();
