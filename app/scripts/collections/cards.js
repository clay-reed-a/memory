/*global Memory, Backbone*/

Memory.Collections = Memory.Collections || {};

(function () {
    'use strict';

    Memory.Collections.Cards = Backbone.Collection.extend({

        model: Memory.Models.Cards

    });

})();
