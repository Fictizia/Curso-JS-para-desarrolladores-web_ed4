define([
	'jquery',
	'underscore',
	'backbone',
	'collections/movies',
	'views/favMovieView',
	'firebase',
	'backfire'
], function ($, _, Backbone, favMovies, favMovieView, Firebase) {

	var AppView = Backbone.View.extend({
        el: $("body"),
        events: {
            "keypress #movieName": "saveToList"
        },
        initialize: function() {
            this.input = this.$("#movieName");
            this.listenTo(favMovies, 'add', this.addOne);
        },
        saveToList: function(e) {
            if (e.keyCode != 13) return;
            else {
                var name = this.input.val();
                if (this.input.val().length > 0) {
                    Backbone.ajax({
                    dataType: "jsonp",
                    url: "http://www.omdbapi.com/?t="+this.input.val()+"&y=&plot=short&r=json",
                    data: "",
                    success: function(details){
                        favMovies.add({
                            name: name,
                            details: details
                        });
                        }
                    });
                }
            }
            this.input.val('');
        },
        addOne: function(movie) {
            if ($('#loading').length > 0) $('#loading').remove();
            var view = new favMovieView({
                model: movie
            });
            this.$("#favMovies").append(view.render().el);
        }
    });
	
    var App = new AppView();
	return AppView;
});