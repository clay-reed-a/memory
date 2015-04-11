window.Memory={Models:{},Collections:{},Views:{},Events:{},init:function(){"use strict";var a=["α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω"],b=["#FC1501","#FF7F00","#FFE600","#0e1","#0BB5FF","#C0F"],c=_.sample(a,6),d=new Memory.Collections.Cards;_.each(c,function(a,c){var e={cardValue:a,cardColor:b[c]},f=new Memory.Models.Card(e),g=new Memory.Models.Card(e);d.add([f,g])});var e=new Memory.Views.Board({collection:d});$(".game").html(e.render().$el)}},_.extend(Memory.Events,Backbone.Events),$(document).ready(function(){"use strict";Memory.init()}),this.JST=this.JST||{},this.JST["app/scripts/templates/board.ejs"]=function(obj){obj||(obj={});{var __p="";_.escape}with(obj)__p+='<div class="cards">\n</div>\n\n';return __p},this.JST["app/scripts/templates/card.ejs"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+='<span class="card_value">'+(null==(__t=cardValue)?"":__t)+"</span>\n\n";return __p},Memory.Views=Memory.Views||{},function(){"use strict";Memory.Views.Board=Backbone.View.extend({template:JST["app/scripts/templates/board.ejs"],tagName:"div",id:"",className:"board",events:{},uncoveredCards:[],moves:0,resetUncoveredCards:function(){this.uncoveredCards=[]},addUncoveredCard:function(a){this.uncoveredCards.push(a),Memory.Events.trigger("UncoveredCardAddedEvent"),2===this.uncoveredCards.length&&(this.moves+=1,this.testIfMatch())},recoverCards:function(){this.$(".card_value").css("color","black")},testIfMatch:function(){var a=this,b=_.pluck(this.uncoveredCards,"cardValue");1===_.uniq(b).length?setTimeout(function(){Memory.Events.trigger("UncoveredCardsMatchEvent"),a.resetUncoveredCards(),setTimeout(function(){a.seeIfWon()},750)},750):setTimeout(function(){Memory.Events.trigger("UncoveredCardsDoNotMatchEvent"),a.resetUncoveredCards()},1e3)},seeIfWon:function(){_.every(this.collection.models,function(a){return a.get("isMatched")})&&($("header h1").text("You remembered!").css("color","black").css("visibility","visible").css("margin-top","2em"),console.log("You won in "+this.moves+" moves!"),setTimeout(function(){window.location.reload(!1)},1500))},initialize:function(){this.listenTo(Memory.Events,"UncoveredCardEvent",this.addUncoveredCard)},render:function(){var a=this;return this.$el.html(this.template()),_.each(_.shuffle(this.collection.models),function(b){var c=new Memory.Views.Card({model:b});a.$(".cards").append(c.render().$el)}),this}})}(),Memory.Views=Memory.Views||{},function(){"use strict";Memory.Views.Card=Backbone.View.extend({template:JST["app/scripts/templates/card.ejs"],tagName:"div",className:"card",events:{click:"uncoverCard"},uncoveredCardsCounter:0,isUncovered:!1,incrementUncoveredCardsCounter:function(){this.uncoveredCardsCounter+=1},removeUncoveredCard:function(){var a=this;this.isUncovered&&(this.$el.css("background-color","white"),this.$(".card_value").css("color","white"),setTimeout(function(){a.$el.css("visibility","hidden")},750),this.model.set("isMatched",!0),this.isUncovered=!1,Memory.Events.trigger("UnuncoveredCardEvent"))},recoverUncoveredCard:function(){var a=this;this.isUncovered&&(this.$(".card_value").css("color","black"),setTimeout(function(){a.$(".card_value").css("display","none")},750),this.isUncovered=!1,Memory.Events.trigger("UnuncoveredCardEvent"))},decrementUncoveredCardsCounter:function(){this.uncoveredCardsCounter-=1},uncoverCard:function(){var a=this;"rgb(0, 0, 0)"===this.$gameHeader.css("color")&&(this.$gameHeader.css("color","white"),setTimeout(function(){a.$gameHeader.css("visibility","hidden")},750)),this.uncoveredCardsCounter<2&&!this.isUncovered&&(Memory.Events.trigger("UncoveredCardEvent",this.model.toJSON()),this.$(".card_value").css("display","block"),setTimeout(function(){a.$(".card_value").css("color",a.model.get("cardColor"))},250),this.isUncovered=!0)},initialize:function(){this.$gameHeader=$("header h1"),this.listenTo(Memory.Events,"UnuncoveredCardEvent",this.decrementUncoveredCardsCounter),this.listenTo(Memory.Events,"UncoveredCardsMatchEvent",this.removeUncoveredCard),this.listenTo(Memory.Events,"UncoveredCardsDoNotMatchEvent",this.recoverUncoveredCard),this.listenTo(Memory.Events,"UncoveredCardAddedEvent",this.incrementUncoveredCardsCounter)},render:function(){return this.$el.html(this.template(this.model.toJSON())),this}})}(),Memory.Collections=Memory.Collections||{},function(){"use strict";Memory.Collections.Cards=Backbone.Collection.extend({model:Memory.Models.Cards})}(),Memory.Models=Memory.Models||{},function(){"use strict";Memory.Models.Card=Backbone.Model.extend({initialize:function(){},defaults:{isMatched:!1}})}();