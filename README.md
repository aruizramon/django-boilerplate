# Django + templated react boilerplate

## Installation instructions
From project root:
`./scripts/init.sh`


## Development
Hot reloading of react components is supported with a webpack server running.
`npm run start` hosts the assets at localhost:8080. 

The django-webpack-loader package is configured to look for webpack bundles
in /assets/build, and can load them into django templates. 
