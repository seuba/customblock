require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

var address, width, height, link, mapsKey, price;

function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function paintSettings () {
	document.getElementById('text-input-id-0').value = mapsKey;
	document.getElementById('text-input-id-2').value = link;
	
	document.getElementById('slider-id-01').value = width;
	document.getElementById('slider-id-02').value = height;

}

function paintSliderValues () {
	document.getElementById('slider-id-01-val').innerHTML = document.getElementById('slider-id-01').value;
	document.getElementById('slider-id-02-val').innerHTML = document.getElementById('slider-id-02').value;
	
}

function paintMap() {
	mapsKey = document.getElementById('text-input-id-0').value;
	
	width = document.getElementById('slider-id-01').value;
	console.log ('anchura' + width);
	height = document.getElementById('slider-id-02').value;
	
	link = document.getElementById('text-input-id-2').value;
	
	/**/
	const Http = new XMLHttpRequest();
const url='https://cors-anywhere.herokuapp.com/https://pub.s10.exacttarget.com/1r4ckkca1cs?mapskey=' + mapsKey + '&link=' + link;
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
  sdk.setContent('<div style="max-width:' + width + ';height:' + height + ';background:#f3f3f3;border:2px solid #373737;border-radius:10px;text-align:center;padding:10px">' + Http.responseText + '</div>');
}
	
	/**/
	//var url = 'https://pub.s10.exacttarget.com/1r4ckkca1cs?mapskey=' + mapsKey + '&link=' + link;
	
	
	sdk.setData({
		address: address,
		width: width,
		height: height,
		
		link: link,
		mapsKey: mapsKey,
		price: price
	});
	
}

sdk.getData(function (data) {
	address = data.address || '';
	
	height = data.height || '';
	
	link = data.link || '';
	mapsKey = data.mapsKey || '';
	paintSettings();
	paintSliderValues();
	paintMap();
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(paintMap, 500)();
	paintSliderValues();
});
document.getElementById('slider-id-01').addEventListener("change", function () {
console.log('change');
	debounce(paintMap, 500)();
	paintSliderValues();
});
document.getElementById('slider-id-02').addEventListener("change", function () {
	debounce(paintMap, 500)();
	paintSliderValues();
});
