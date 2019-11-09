## iGurbani - A GurbaniDB API Sample App

Lovingly developed in pure HTML, CSS and JavaScript, and compatible across desktop, tablet and mobile devices - this lightweight app showcases what is possible to build upon the [GurbaniDB API](https://github.com/sikher/gurbanidb)

This app is currently __only__ compatible with __GurbaniDB Version 2.2__.

## Demo
Please view the latest demo at https://sikher.github.io/igurbani/

## Pre-requisites
1. Access to `Terminal` or the command-line
2. Git: http://git-scm.com/downloads
3. Node.js: http://nodejs.org/
4. Grunt Command Line Interface (CLI): `npm install -g grunt-cli`

## Installation
1. Download this repo
2. Navigate to the repo in `Terminal` using `cd`
3. Run `npm install` to install all the dependencies through Node.js
4. Run `grunt` to make sure everything is installed properly. You should see something like:

		Running "uglify:my_target" (uglify) task
		Source Map "js/main.min.map" created.
		File "js/main.min.js" created.

		Running "cssmin:compress" (cssmin) task
		File css/main.min.css created.
		Uncompressed size: 136603 bytes.
		Compressed size: 14984 bytes gzipped (113536 bytes minified).

		Done, without errors.

5. Finally, please modify `config.json` to have the correct API endpoint. To use the official GurbaniDB API you should leave it as the default (with a trailing slash /):

		{"api":"https://api.sikher.com/"}

6. Now each time you add or modify the css or js files, please remember to:
	* Update your `Gruntfile.js` with the correct `files` under `uglify`
	* Run `grunt` to update your files
	* Hard refresh your browser to see the changes and to avoid caching issues with Ctrl+Shift+R (Windows/Linux) or ⌘+Shift+R (Mac)

__Please Note:__ If you are planning to use this code locally then you may need to setup a local server otherwise the code may fail due to restrictions in the Same Origin Policy in some browsers when using `file:///`

## To Do
- Simple functions that work across all endpoints - need to add view hymn and page
- When hovering over an author/melody, a popup dialog gives the description
- Currently only the first 10 results are returned, can also have pagination for results
- Add a way to update any local data if the version of the API changes (should happen in config)
