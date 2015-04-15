# SVG Performance Test cases

This repo tests the relative speeds of SVG icon, font icons and SVG as background images

## Running the tests

Tests can be run either on a mobile browser, or in a Cordova app. 
To get started

1. Clone this repo 
2. Run `npm install -g ionic gulp bower`
3. CD into each folder and run `npm install`
4. Run `bower install` and `gulp` inside demo1, demo2 and demo3 
5. [Download Chromedriver](https://sites.google.com/a/chromium.org/chromedriver/) and start it.

### Cordova App on Android

1. CD into each of demo1, demo2 and demo 3 and run `ionic hooks add` and `ionic platform add android`
2. Install demo1, demo2 and demo3 apps on your android device or emulator using `ionic run`. 
3. Change `DEVICE` variable in `test/index.js` to `cordova` in the `runTest` function
4. Run `node test/index.js`. All data will be available in `data.json`

### Chrome on Android 

1. Start a http server with the repo as root. You could also go `npm install -g servedir` and start server using `servedir . 8080` 
2. Change `DEVICE` variable in `test/index.js` to `mobile` in `runTest` function
4. Run `node test/index.js`. All data will be available in `data.json`
