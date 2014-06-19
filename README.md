Autotranslated Wall
===

# Run

	npm install # Install the dependencies

Open a 1st terminal and run :

	node bin/proxy.js

Open a 2nd terminal and run :

	node bin/www

Navigate with a webbrowser to `localhost:3000`

Has been tested with a fresh install of Ubuntu with git/node/npm.

# Hack (do it to work on the server)

## Dependencies

	sudo npm install -g nodemon
	sudo apt-get install mongodb


## Run the application

Retrieve the project :

```
git clone git@github.com:simonrenoult/autotranslated-wall.git
cd autotranslated-wall
```

Install the dependencies :

```
npm run-script setup
```

Run the server locally :

```
npm run-script dev
```
