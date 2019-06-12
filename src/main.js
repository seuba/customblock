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
	height = document.getElementById('slider-id-01').value;
	
	link = document.getElementById('text-input-id-2').value;
	console.log('el link es' + link);
	if(link !=''){
	/**/
	const Http = new XMLHttpRequest();
const url='https://cors-anywhere.herokuapp.com/https://pub.s10.exacttarget.com/1r4ckkca1cs?mapskey=' + mapsKey + '&link=' + link;
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
  var obj = JSON.parse(Http.responseText);
  if(obj.namec ==''){
	  console.log('buit');
  }
  else{
  	var Http2 = new XMLHttpRequest();
	var url2='https://www.cangureo.es/ajaxr.php?namec=' + obj.namec + '&width=' + width + '&height=' + height + '&imag=' + obj.imag+ '&start=' + obj.start+ '&end=' + obj.end;
	
	Http2.open("GET", url2);
	
	Http2.send();
     Http2.onreadystatechange = (e) => {
  
  
  sdk.setContent('<a href='+ obj.link +'><img width=' + width + '  height=' + height + ' src=' + url2 + '></a>');
	 }
  }
}
	
	/**/
	//var url = 'https://pub.s10.exacttarget.com/1r4ckkca1cs?mapskey=' + mapsKey + '&link=' + link;
	
	
	sdk.setData({
		
		width: width,
		height: height,
		link: link,
		mapsKey: mapsKey
		
	});
	}else{
		console.log('es blanc');
	}
} /**/

sdk.getData(function (data) {
	
	width: data.width || '';
	height = data.height || '';
	link = data.link || '';
	mapsKey = data.mapsKey || '';
	paintSettings();
	paintSliderValues();
	paintMap();
});

document.getElementById('text-input-id-2').addEventListener("input", function () {
	paintMap();
	paintSliderValues();
});
document.getElementById('slider-id-01').addEventListener("change", function () {
console.log('change');
	
	paintSliderValues();
	paintMap();
});


