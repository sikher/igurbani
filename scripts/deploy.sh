#!/usr/bin/env sh

# abort on errors
set -e

# navigate into the build output directory
cd dist

# set some same Git defaults
git config --global user.email "bot@sikher.com"
git config --global user.name "Sikher Bot"
git config --global init.defaultBranch master

# initialise the repo and set the remote origin with an access token
git init
git remote add origin https://$1@github.com/$2.git

# lets start adding the build files
git add --all
git commit -m "deploy"

# checkout the gh-pages special branch for GitHub Pages
git checkout -b gh-pages

# always force push the latest version of the code
git push origin gh-pages --force

echo "Successfully deployed the app"

cd -