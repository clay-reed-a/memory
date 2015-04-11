/*global Memory, $*/


window.Memory = {
    Models: {},
    Collections: {},
    Views: {},
    Events: {},
    init: function() {
        'use strict';
        var allLetters = [
            'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η',
            'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 
            'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 
            'χ', 'ψ', 'ω'
        ];

        var letters = _.sample(allLetters, 6), 
            cards = new Memory.Collections.Cards();

        _.each(letters, function(letter){
            var attrs         = {cardValue: letter}; 
            var cardPairFirst = new Memory.Models.Card(attrs),  
               cardPairSecond = new Memory.Models.Card(attrs);
            
            cards.add([cardPairFirst, cardPairSecond]);
        });

        var boardView = new Memory.Views.Board({collection: cards}); 
        $('.game').html(boardView.render().$el);
        
    }
};

_.extend(Memory.Events, Backbone.Events);

$(document).ready(function () {
    'use strict';
    Memory.init();
});
