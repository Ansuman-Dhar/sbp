var lat = 21.4703944;
var lon = 83.9750000;
const apiKey = '7d54a48c-2ffe-4dc8-830d-b1c6a3607e33';

const html_temp = document.getElementById("temp");
const html_aqi = document.getElementById("aqi");
const html_hu = document.getElementById("hu");
const html_ws = document.getElementById("ws");
const html_wd = document.getElementById("wd");

const data_url = "https://api.airvisual.com/v2/nearest_city?lat=" +lat+ "&lon=" +lon+ "&key=" +apiKey;

//Map
var map = L.map('map').setView([lat, lon], 15);

L.tileLayer('https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=VJDOQr3nasl8c1OHLipH', {
	attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);
//Map

async function main(){
	var response = await fetch(data_url);
	var statistics = await response.json();
	
	const temp = statistics.data.current.weather.tp;
	html_temp.textContent = temp + '\u2103';
	
	const aqi = statistics.data.current.pollution.aqius;
	html_aqi.textContent = aqi;
	
	const humidity = statistics.data.current.weather.hu;
	html_hu.textContent = humidity + '\u0025';
	
	const wind_speed = statistics.data.current.weather.ws;
	html_ws.textContent = wind_speed + ' m/s';
	
	const wind_direction = statistics.data.current.pollution.aqius;
	html_wd.textContent = wind_direction + '\u2103';
}

main();
