define([
	'jquery',
	'underscore',
	'backbone',
	'collections/movies',
	'views/AppView',
	'firebase', 
	'templates/templates',
	'backfire'
], function ($, _, Backbone, favMovies, AppView, Firebase, templates) {

	var favMovieView = Backbone.View.extend({
        tagName: "li",
        events: {
            "click .details": "details",
            "click .delete": "clear",
            "click .edit": "edit"
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'remove', this.remove);
            this.listenTo(this.model, 'details', this.details);
        },
        render: function() {
            this.$el.html(_.template(templates.movieTemplate, this.model.toJSON()));
            return this;
        },
        details: function(){
            $("#movieDetails").show();
            $("#movieDetails").html(_.template(templates.detailsTemplate, this.model.toJSON()));
            $('.close').click(function(){ $("#movieDetails").hide(); return false; });
        },
        edit: function() {
            var movieName = prompt("Update the movie name", this.model.get('name').trim());
            var modeloActual = this.model;
            if (movieName && movieName.length > 0) {
                Backbone.ajax({
                    dataType: "jsonp",
                    url: "http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&r=json",
                    data: "",
                    success: function(details){
                        modeloActual.set({
                            name: movieName,
                            details: details
                        });
                        }
                    });
            }
        },
        clear: function() {
            var response = confirm("Are certain about removing \"" + this.model.get('name').trim() + "\" from the list?");
            if (response === true) {
                favMovies.remove(this.model);
            }
            $("#movieDetails").hide();
        }
    });

	return favMovieView;

});