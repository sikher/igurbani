#!/usr/bin/env bash

# abort on errors
set -e

# set some same Git defaults
git config --global user.email "bot@sikher.com"
git config --global user.name "Sikher Bot"

# initialise the repo and set the remote origin with an access token
# This step has been moved to the GHA

# lets start adding the build files
git add --all
git commit -m "Updating the gh-pages branch"

# checkout the gh-pages special branch for GitHub Pages
# This step has been moved to the GHA

# always force push the latest version of the code
git push origin gh-pages --force

echo "Successfully deployed the app"