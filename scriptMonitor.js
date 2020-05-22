const apiDetection = (function () {
	
	const detectApiAccess = function () {

        const attributesToMonitor = {
            navigator: [
                'platform',
                'userAgent',
                'platform',
                'plugins',
                'mimeTypes',
                'doNotTrack',
                'languages',
                'productSub',
                'language',
                'vendor',
                'oscpu',
                'hardwareConcurrency',
                'cpuClass',
                'webdriver',
                'maxTouchPoints',
                'appVersion',
                'appCodeName',
                'cookieEnabled'
            ],
            screen: [
                'width',
                'height',
                'availWidth',
                'availHeight',
                'availTop',
                'availLeft',
                'colorDepth',
                'pixelDepth'
            ],
            window: [
                'ActiveXObject',
                'webdriver',
                'domAutomation',
                'domAutomationController',
                'callPhantom',
                'spawn',
                'emit',
                'Buffer',
                'awesomium',
                '_Selenium_IDE_Recorder',
                '__webdriver_script_fn',
                '_phantom',
                '__nightmare',
                'callSelenium',
                '_selenium',
                'scrollX',
                'scrollY',
                'pageXOffset',
                'pageYOffset',
                'outerHeight',
                'outerWidth',
                'innerWidth',
                'innerHeight',
                'devicePixelRatio',
                'localStorage',
                'indexedDB',
                'sessionStorage'
            ]
        };

        function saveApiAccess(prop, subProp) {
            if(Object.keys(window.navigator.monitorApiAccess).length < 5) {

                if (window.navigator.monitorApiAccess[`${prop}.${subProp}`] === undefined)
                    window.navigator.monitorApiAccess[`${prop}.${subProp}`] = 1;
                else
                    window.navigator.monitorApiAccess[`${prop}.${subProp}`]++;
            }
            return originalValues[subProp];
        }

        window.navigator.monitorApiAccess = {};
        const originalValues = {};
        let attributeCounter = 0;
        for (let prop of Object.keys(attributesToMonitor)) {
            for (let subProp of attributesToMonitor[prop]) {
                if(prop !== 'window') {
                    originalValues[subProp] = window[prop][subProp];
                    window[prop].__defineGetter__(subProp, () => {
                        return saveApiAccess(prop, subProp);
                    });
                } else {
                    originalValues[subProp] = window[subProp];
                    window.__defineGetter__(subProp, () => {
                        return saveApiAccess(prop, subProp);
                    });
                }
            }
        }

	};

	return detectApiAccess

})();

module.exports = {
	detectApiAccess: apiDetection,
};