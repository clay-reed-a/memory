/*global Memory, Backbone*/

Memory.Models = Memory.Models || {};

(function () {
    'use strict';

    Memory.Models.Card = Backbone.Model.extend({

        initialize: function() { 
        },

        defaults: {
            isMatched: false
        }
    });


})();
