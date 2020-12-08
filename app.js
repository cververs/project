console.log("working");
let lat = null;
let long = null;

const getLocation = new Promise((res) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(position.coords);
      const url = `http://api.weatherunlocked.com/api/current/${lat},${long}?app_id=f7ace40d&app_key=535832c168314b149a87d7d93369a990`;
      getTemp(showTemp, url);
    });
  } else {
    window.alert("Could not get location");
  }
});

function getTemp(callback, url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((tempObject) => {
      callback(tempObject);
      console.log(tempObject);
    });
}

function showTemp(tempObject) {
  console.log(tempObject.temp_c);
  const tempInsert = document.querySelector(".temperature-degree");
  tempInsert.innerHTML = tempObject.temp_c;
  const tempDescription = document.querySelector(".temperature-description");
  tempDescription.innerHTML = tempObject.wx_desc;
  const locationDescription = document.querySelector(".location-wind");
  tempDescription.innerHTML = tempObject.wx_desc;
  const windDescription = document.querySelector(".wind-direction");
  windDescription.innerHTML = tempObject.winddir_compass;
  const windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = tempObject.windspd_kts;
  const icon = document.querySelector(".icon");
  console.log(tempObject.wx_icon);
  icon.src = `set/${tempObject.wx_icon}`;
}

let map;
function createMap(position) {
  const { latitude, longitude } = position.coords;
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: latitude, lng: longitude },
  });
}
