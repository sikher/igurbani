$(document).ready(function(){

	// Config

	var api = '',
	output = '',
	results = {},
	search_text = $('.search-text'),
	search_btn = $('.search-btn'),
	search_advanced = $('.search-advanced'),
	search_advanced_btn = $('.search-advanced-btn'),
	search_type = $('.search-type'),
	search_translation = $('.search-translation'),
	search_transliteration = $('.search-transliteration'),
	results_header = $('.results-header'),
	results_content = $('.results-content'),
	error_message = $('.error-message'),
	spinjs_options = {
		lines: 9, // The number of lines to draw
		length: 6, // The length of each line
		width: 6, // The line thickness
		radius: 8, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#000', // #rgb or #rrggbb or array of colors
		speed: 1.5, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: true, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
	},
	target = document.getElementById('spinner'),
	spinner = new Spinner(spinjs_options);

	$.getJSON('config.json',function(data)
	{
		api  = data.api;
	});

	search_text.focus(); // Set the focus to the search text field

	// Main Functions

	function getSearchOptions()
	{
		var params = [];
		if(search_type.val() != ''){
			params.push(search_type.val());

			if(search_text.val() != ''){
				params.push(search_text.val());

				if(search_translation.val() != ''){
					params.push(search_translation.val());

					if(search_transliteration.val() != ''){
						params.push(search_transliteration.val());
					}
				}
			}
		}

		getData('search/', params, doSearch);
	}

	function toggleAdvancedSearch()
	{
		search_advanced.slideToggle();
	}

	function getData(endpoint, params, fn)
	{
		// Save the endpoint and params data
		results['endpoint'] = endpoint;
		results['params'] = params;

		// Create the API endpoint from this data
		var url = api+endpoint+params.join('/');

		// Start the loading spinner
		spinner.spin(target);

		// Do the AJAX call to return the JSON
		var jqxhr = $.getJSON(url, fn).fail(showError);
	}

	function saveData(data)
	{
		results['data'] = data;
		return this;
	}

	function doSearch(data)
	{
		spinner.stop();
		error_message.hide();
		error_message.html('');
		saveData(data);
		createSearchResultsHTML();
		showSearchResults();
	}

	function createSearchResultsHTML()
	{
		output = '';
		var count = results['data'].length || 0;
		var search = results['params'][1] || "Empty Search";

		results_header.html(count+' Results Found for "'+search+'"');
		results_header.show();

		// If the output is scripture do this...

		if(results['endpoint'] == 'search/' && results['params'][0] < 3)
		{
			for(var result in results['data'])
			{
				var line = results['data'][result];
				output += '<ul class="result">';
				output += '<li class="scripture">' + line['text'] + '</li>';
				output += '<li class="translation">' + line['translation']['text'] + '</li>';
				output += '<li class="transliteration">' + line['transliteration']['text'] + '</li>';
				output += '<li class="melody">' + line['melody']['melody'] + '</li>';
				output += '<li class="author">' + line['author']['author'] + '</li>';
				output += '</ul>';
			}
		}

		// If the output is translation do this...

		else if(results['endpoint'] == 'search/' && results['params'][0] == 3)
		{
			for(var result in results['data'])
			{
				var line = results['data'][result];
				output += '<ul class="result">';
				output += '<li class="scripture">' + line['scripture']['text'] + '</li>';
				output += '<li class="translation">' + line['text'] + '</li>';
				output += '<li class="transliteration">' + line['transliteration']['text'] + '</li>';
				output += '<li class="melody">' + line['scripture']['melody']['melody'] + '</li>';
				output += '<li class="author">' + line['scripture']['author']['author'] + '</li>';
				output += '</ul>';
			}
		}

		// If the output is transliteration do this...
		
		else if(results['endpoint'] == 'search/' && results['params'][0] == 4)
		{
			for(var result in results['data'])
			{
				var line = results['data'][result];
				output += '<ul class="result">';
				output += '<li class="scripture">' + line['scripture']['text'] + '</li>';
				output += '<li class="translation">' + line['translation']['text'] + '</li>';
				output += '<li class="transliteration">' + line['text'] + '</li>';
				output += '<li class="melody">' + line['scripture']['melody']['melody'] + '</li>';
				output += '<li class="author">' + line['scripture']['author']['author'] + '</li>';
				output += '</ul>';
			}
		}

		else
		{
			console.log("The result was something else, so lets investigate");
			console.log(results);
		}

		return output;
	}

	function showSearchResults()
	{
		return results_content.html(output);
	}

	function showError()
	{
		spinner.stop();
		output = '';
		showSearchResults();
		results_header.hide();
		results_header.html('');
		error_message.html('Sorry, no results found. Please try another search.')
		error_message.show();
	}

	// Events

	search_btn.on('click',getSearchOptions);
	search_advanced_btn.on('click',toggleAdvancedSearch);

});
