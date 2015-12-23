define([ 'backbone', 'firebase', 'models/movie', 'backfire' ], function( Backbone, Firebase, Movie ){    

    var Movies = Backbone.Firebase.Collection.extend({
        model: Movie,
        firebase: new Firebase("https://experimentos.firebaseio.com/bbmovies")
    });
    
    // init collection
    var favMovies = new Movies();

    return favMovies;
});