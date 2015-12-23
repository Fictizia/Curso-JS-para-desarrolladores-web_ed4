define([

    'text!templates/movieTemplate.html',
    'text!templates/detailsTemplate.html',

], function (movieTemplate, detailsTemplate) {
	return {
		movieTemplate: movieTemplate,
		detailsTemplate: detailsTemplate
	}
});