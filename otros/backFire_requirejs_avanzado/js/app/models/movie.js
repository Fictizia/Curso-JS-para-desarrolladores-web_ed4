define([
	'underscore',
	'backbone'
], function (_, Backbone) {

    var Movie = Backbone.Model.extend({
        defaults: function() {
            return {
                name: "",
                details: {}
            };
        }
    });

    return Movie;
});