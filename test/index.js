var browserPerf = require('browser-perf');
var fs = require('fs');

function runTest(demoType, device, cb) {
	var appIds = {
		demo1: 'com.ionicframework.demo1882448',
		demo2: 'com.ionicframework.demo2709515',
		demo3: 'com.ionicframework.demo3175062'
	};

	var options = {
		selenium: 'localhost:9515',
		browsers: [{
			browserName: 'android'
		}],
		actions: [browserPerf.actions.scroll({
			scrollElement: 'document.getElementsByTagName("ion-content")[0]'
		})],
		preScript: function(browser) {
			return browser.sleep(5000);
		}
	}

	if (device === 'cordova') {
		options.browsers[0].chromeOptions = {
			androidActivity: appIds[demoType] + '.MainActivity',
			androidPackage: appIds[demoType]
		}
	}

	browserPerf(device === 'cordova' ? undefined : 'http://localhost:8080/' + demoType + '/www/index.html', cb, options);
};

function saveData(demoType, device, res) {
	var DATA_FILE = 'data.json';
	var data = {};
	try {
		data = JSON.parse(fs.readFileSync(DATA_FILE));
	} catch (e) {
		console.log(e);
	}

	if (typeof data[device] === 'undefined') {
		data[device] = {};
	}
	if (typeof data[device][demoType] === 'undefined') {
		data[device][demoType] = {};
	}

	for (var metric in res) {
		if (typeof data[device][demoType][metric] === 'undefined') {
			data[device][demoType][metric] = [];
		}
		data[device][demoType][metric].push(res[metric]);
	}

	fs.writeFileSync(DATA_FILE, JSON.stringify(data));
}


(function runTests(i) {
	var DEVICE = 'cordova'
	if (i > 3) {
		console.log('All tests done');
		return;
	}
	runTest('demo' + i, DEVICE, function(err, res) {
		if (err) {
			console.log('ERROR RUNNING TESTS ', err);
		} else {
			saveData('demo' + i, DEVICE, res[0]);
		}
		runTests(i + 1);
	});
}(1));