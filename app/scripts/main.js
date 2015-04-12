/*global Memory, $*/


window.Memory = {
    Models: {},
    Collections: {},
    Views: {},
    Events: {},
    init: function() {
        'use strict';
        
        var boardView = new Memory.Views.Board(); 
        $('.game').html(boardView.render().$el);
        
    }
};

_.extend(Memory.Events, Backbone.Events);

$(document).ready(function () {
    'use strict';
    Memory.init();
});
