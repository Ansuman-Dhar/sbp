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

L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}@2x.jpg?key=VJDOQr3nasl8c1OHLipH', {
	attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);
//Map

async function weatherpollutants(){
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
	
	const wind_direction = statistics.data.current.weather.wd;
	html_wd.textContent = wdstr(wind_direction) + ' (' + wind_direction + '\u00B0)';
}

function wdstr(dir_num){
	let wd_str;
	if ((dir_num >= 337 && dir_num <= 360) || (dir_num >= 0 && dir_num <= 22))
		wd_str = "North";
	else if (dir_num > 22 && dir_num < 67)
		wd_str = "North-East";
	else if (dir_num >= 67 && dir_num <= 112)
		wd_str = "East";
	else if (dir_num > 112 && dir_num < 157)
		wd_str = "South-East";
	else if (dir_num >= 157 && dir_num <= 202)
		wd_str = "South";
	else if (dir_num > 202 && dir_num < 247)
		wd_str = "South-West";
	else if (dir_num >= 247 && dir_num <= 292)
		wd_str = "West";
	else if (dir_num > 292 && dir_num < 337)
		wd_str = "North-West";
	else
		wd_str = "WIND DIR CALC ERR";
	return wd_str;
}

weatherpollutants();
