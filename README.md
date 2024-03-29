## iGurbani - A GurbaniDB API Sample App

Lovingly developed in pure HTML, CSS and JavaScript, and compatible across desktop, tablet and mobile devices - this lightweight app showcases what is possible to build upon the [GurbaniDB API](https://github.com/sikher/gurbanidb)

This app is currently __only__ compatible with __GurbaniDB Version 2.2__.

## Demo
Please view the latest demo at https://sikher.github.io/igurbani/

## Pre-requisites
1. Access to `Terminal` or the command-line
2. Git: http://git-scm.com/downloads
3. Node.js: http://nodejs.org/

## Installation
1. Download this repo
2. Navigate to the repo in `Terminal` using `cd`
3. Run `npm install` to install all the dependencies through Node.js

		You should see something like:

		up to date, audited 11 packages in 780ms

		3 packages are looking for funding
		run `npm fund` for details

		found 0 vulnerabilities

5. Finally, please modify `config.json` to have the correct API endpoint. To use the official GurbaniDB API you should leave it as the default (with a trailing slash /):

		{"api":"https://api.sikher.com/"}

6. Now each time you add or modify the css or js files, please remember to:
	* Run `npm run build` or `npm run dev` to update your files
	* Hard refresh your browser to see the changes and to avoid caching issues with Ctrl+Shift+R (Windows/Linux) or ⌘+Shift+R (Mac)

__Please Note:__ If you are planning to use this code locally then you may need to setup a local server otherwise the code may fail due to restrictions in the Same Origin Policy in some browsers when using `file:///`

## To Do
- Simple functions that work across all endpoints - need to add view hymn and page
- When hovering over an author/melody, a popup dialog gives the description
- Currently only the first 10 results are returned, can also have pagination for results
- Add a way to update any local data if the version of the API changes (should happen in config)
