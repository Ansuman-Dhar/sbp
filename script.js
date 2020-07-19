var lat = 21.4703944;
var lon = 83.9750000;
const apiKey = 'bqb1rqr8ggh0hnk4a3v5dc3all';

const html_temp = document.getElementById("temp");
const html_aqi = document.getElementById("aqi");
const html_update = document.getElementById("update");

const data_url = "http://api.airpollutionapi.com/1.0/aqi?lat=" +lat+ "&lon=" +lon+ "&APPID=" +apiKey;

//Map
var map = L.map('map').setView([lat, lon], 15);

L.tileLayer('https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=VJDOQr3nasl8c1OHLipH', {
	attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);
//Map

async function main(){
	var response = await fetch(data_url);
	var statistics = await response.json();
	
	const temp = statistics.data.temp;
	html_temp.textContent = temp + '\u2103';
	
	const aqi = statistics.data.value;
	html_aqi.textContent = aqi;
	
	const update = statistics.data.updated;
	html_update.textContent = update.slice(0, update.length - 10);
}

main();