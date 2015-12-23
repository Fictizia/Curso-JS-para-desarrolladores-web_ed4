$(document).ready(function() {
    // model
    var Movie = Backbone.Model.extend({
        defaults: function() {
            return {
                name: "",
                details: {}
            };
        }
    });
    
    //collection
    var Movies = Backbone.Firebase.Collection.extend({
        model: Movie,
        firebase: new Firebase("https://experimentos.firebaseio.com/bbmovies")
    });
    
    // init collection
    var favMovies = new Movies();
    
    //view
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
            this.$el.html(_.template($('#movieTemplate').html().trim(), this.model.toJSON()));
            return this;
        },
        details: function(){
            $("#movieDetails").show();
            $("#movieDetails").html(_.template($('#detailsTemplate').html().trim(), this.model.toJSON()));
            $('.close').click(function(){ $("#movieDetails").hide(); return false; });
        },
        edit: function() {
            var movieName = prompt("Update the movie name", this.model.get('name').trim());
            var modeloActual = this.model
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
            if (response == true) {
                favMovies.remove(this.model);
            }
            $("#movieDetails").hide();
        }
    });

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
    
});
