const puppeteer = require('puppeteer');
const detectApiAccess = require('./scriptMonitor').detectApiAccess;

(async () => {

	const urls = ['google.com', 'facebook.com', 'youtube.com', 'microsoft.com', 'netflix.com', 'twitter.com', 'instagram.com', 'qq.com', 'linkedin.com', 'wikipedia.org', 'apple.com', 'baidu.com', 'amazon.com', 'live.com', 'yahoo.com', 'doubleclick.net', 'blogspot.com', '360.cn', 'pinterest.com', 'bing.com', 'github.com', 'zoom.us', 'bit.ly', 'msn.com', 'vk.com', 'godaddy.com', 'mozilla.org', 'skype.com', 'flickr.com', 'dropbox.com', 'okezone.com', 'whatsapp.com', 'soundcloud.com', 'gravatar.com', 'apache.org', 'csdn.net', 'europa.eu', 'yelp.com', 'nih.gov', 'ebay.com', 'twitch.tv', 'theguardian.com', 'w3.org', 'bbc.co.uk', 'sourceforge.net', 'imdb.com', 'forbes.com', 'stackoverflow.com', 'fandom.com', 'imgur.com', 'bongacams.com', 'paypal.com', 'archive.org', 'bbc.com', 'livejasmin.com', 'spotify.com', 'aliexpress.com', 'weebly.com', 'zhanqi.tv', 'myshopify.com', 'panda.tv', 'yandex.ru', 'creativecommons.org', 'worldometers.info', 'who.int', 'php.net', 'slideshare.net', 'washingtonpost.com', 'issuu.com', 'oracle.com', 'reuters.com', 'chaturbate.com', 'mail.ru', 'wsj.com', 'digicert.com', 'businessinsider.com', 'gnu.org', 'tinyurl.com', 'bloomberg.com', 'cnbc.com', 'cdc.gov', 'espn.com', 'cnet.com', 'mit.edu', 'pornhub.com', 'opera.com', 'app-measurement.com', 'stackexchange.com', 'huanqiu.com', 'alibaba.com', 'walmart.com', 'virginmedia.com', 'ibm.com', 'force.com', 'blogger.com', 'sciencedirect.com', 'indiatimes.com', 'stanford.edu', 'udemy.com', 'outlook.com'];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.evaluateOnNewDocument(detectApiAccess);

    for(i = 0; i < urls.length; i++){

		console.log('Visiting [' + i + ']: ' + urls[i]);

		await page.goto('https://' + urls[i]);

	    const evalResult = await page.evaluate(() => {
	        return new Promise(resolve => {
	            setTimeout(() => {
	                resolve(navigator.monitorApiAccess);
	            }, 5000);
	        });
	    });

	    console.log(evalResult);
	}

    await browser.close();
})();