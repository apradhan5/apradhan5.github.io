var displayLocationName;
var lat;
var todaySunriseTime;
var todaySunsetTime;
var todayDawnTime;
var todayDuskTime;
var todayDayLength;
var todaySolarNoonTime;
var todayTimeZone;
var tomorrowSunriseTime;
var tomorrowSunsetTime;
var tomorrowDawnTime;
var tomorrowDuskTime;
var tomorrowDayLength;
var tomorrowSolarNoonTime;
var tomorrowTimeZone;

// Function to handle location search input
function handleLocationSearch() {
  let locationSearchInput = document.getElementById("locationSearchInput").value

  if (locationSearchInput.trim().length != 0) {
    let getGeoCodeUrl = "https://geocode.maps.co/search?q=" + encodeURIComponent(locationSearchInput);
    let outerLoaderElement = document.getElementById("loaderOuter");
    outerLoaderElement.style.display = "block";

    setTimeout(() => { 
      outerLoaderElement.style.display = "none";
    }, 1500);

    let toastElement = document.getElementById("toastError");
    
    fetch(getGeoCodeUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error');
        }
        return response.json();
      })
      .then((data) => {
        if (data.length != 0) {
          let toastSuccessElement = document.getElementById("toastSuccess");
          toastSuccessElement.classList.add("show");

          setTimeout(() => {
            toastSuccessElement.classList.remove("show");
          }, 4000);
          
          displayLocationName = data[0].display_name;
          document.getElementById("todayLocationHeading").innerHTML = displayLocationName;
          document.getElementById("tomorrowLocationHeading").innerHTML = displayLocationName;
          
          lat = data[0].lat;
          lon = data[0].lon;

          var todayDate = new Date();
          todayDate.setHours(0, 0, 0, 0);

          var tomorrowDate = new Date(todayDate);
          tomorrowDate.setDate(todayDate.getDate() + 1);

          var formattedTodayDate = todayDate.toISOString().split('T')[0]; // YYYY-MM-DD
          var formattedTomorrowDate = tomorrowDate.toISOString().split('T')[0]; // YYYY-MM-DD

          let todaySunriseSunsetUrl = "https://api.sunrisesunset.io/json?lat=" + encodeURIComponent(lat) + "&lng=" + encodeURIComponent(lon) + "&date=" + formattedTodayDate;
          todaySunriseSunsetApiCall(todaySunriseSunsetUrl, formattedTodayDate);

          let tomorrowDateSunriseSunsetUrl = "https://api.sunrisesunset.io/json?lat=" + encodeURIComponent(lat) + "&lng=" + encodeURIComponent(lon) + "&date=" + formattedTomorrowDate;
          tomorrowSunriseSunsetApiCall(tomorrowDateSunriseSunsetUrl, formattedTomorrowDate);

          const noDataElement = document.querySelectorAll('.noData');

          noDataElement.forEach(box => { box.style.display = 'none'; });

        }
        else {
          toastElement.innerHTML = "Invalid Location : " + locationSearchInput
          toastElement.classList.add("show");
          setTimeout(() => { 
            toastElement.classList.remove("show");
          }, 4000);
        }
      })
      .catch((error) => {
        console.log("Error from GeoCode API-> ", error);
        toastElement.innerHTML = "Error from API Callout : " + JSON.stringify(error);
        toastElement.classList.add("show");
        setTimeout(() => { 
          toastElement.classList.remove("show");
        }, 4000);
      })
  }
  else {
    let toastElement = document.getElementById("toastError");
    toastElement.innerHTML = "Please Enter Location !! "
    toastElement.classList.add("show");
    setTimeout(() => { // After 4 seconds, the class will be removed from div
      toastElement.classList.remove("show");
    }, 4000);
  }
}

// Function to call the SunriseSunsetAPI for the todaysDate
function todaySunriseSunsetApiCall(todaySunriseSunsetUrl, todayDate) {
  fetch(todaySunriseSunsetUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }
      return response.json();
    })
    .then((data) => {
      let sunriseSunsetApiData = data.results;
      todaySunriseTime = sunriseSunsetApiData.sunrise;
      document.getElementById("todaySunriseText").innerHTML = todaySunriseTime;

      todaySunsetTime = sunriseSunsetApiData.sunset;
      document.getElementById("todaySunsetText").innerHTML = todaySunsetTime;

      todayDawnTime = sunriseSunsetApiData.dawn;
      document.getElementById("todayDawnText").innerHTML = todayDawnTime;

      todayDuskTime = sunriseSunsetApiData.dusk;
      document.getElementById("todayDuskText").innerHTML = todayDuskTime;

      todayDayLength = sunriseSunsetApiData.day_length;
      document.getElementById("todayDayLengthText").innerHTML = todayDayLength;

      todaySolarNoonTime = sunriseSunsetApiData.solar_noon;
      document.getElementById("todaySolarNoonText").innerHTML = todaySolarNoonTime;

      todayTimeZone = sunriseSunsetApiData.timezone;
      document.getElementById("todayTimeZoneText").innerHTML = todayTimeZone;

      document.getElementById("todayDate").innerHTML = todayDate;

      document.getElementById("todayCards").style.visibility = "visible";

    })
    .catch((error) => {
      console.error("Error from GeoCode API-> ", error);
    })
}

// Function to call the SunriseSunsetAPI for the tomorrowsDate
function tomorrowSunriseSunsetApiCall(tomorrowDateSunriseSunsetUrl, tomorrowDate) {
  fetch(tomorrowDateSunriseSunsetUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }
      return response.json();
    })
    .then((data) => {
      let sunriseSunsetApiData = data.results;
      tomorrowSunriseTime = sunriseSunsetApiData.sunrise;
      document.getElementById("tomorrowSunriseText").innerHTML = tomorrowSunriseTime;

      tomorrowSunsetTime = sunriseSunsetApiData.sunset;
      document.getElementById("tomorrowSunsetText").innerHTML = tomorrowSunsetTime;

      tomorrowDawnTime = sunriseSunsetApiData.dawn;
      document.getElementById("tomorrowDawnText").innerHTML = tomorrowDawnTime;

      tomorrowDuskTime = sunriseSunsetApiData.dusk;
      document.getElementById("tomorrowDuskText").innerHTML = tomorrowDuskTime;

      tomorrowDayLength = sunriseSunsetApiData.day_length;
      document.getElementById("tomorrowDayLengthText").innerHTML = tomorrowDayLength;

      tomorrowSolarNoonTime = sunriseSunsetApiData.solar_noon;
      document.getElementById("tomorrowSolarNoonText").innerHTML = tomorrowSolarNoonTime;

      tomorrowTimeZone = sunriseSunsetApiData.timezone;
      document.getElementById("tomorrowTimeZoneText").innerHTML = tomorrowTimeZone;

      document.getElementById("tomorrowDate").innerHTML = tomorrowDate;

      document.getElementById("tomorrowCards").style.visibility = "visible";


    })
    .catch((error) => {
      console.error("Error from GeoCode API-> ", error);
    })
}
