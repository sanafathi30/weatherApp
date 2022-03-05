let serchInput = document.querySelector("#search-text");
let searchIcon = document.querySelector("#search-icon");



let city = "Tehran";
let key = "0962dc1fc48ff43b087025aa1e35e11b";
let unit = "metric"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${unit}`;





axios.get(apiUrl)
    .then(function(response) {
        let t = document.querySelector("#dg");

        t.innerHTML = Math.round(response.data.main.temp);





    });


//////////////////////////

let f1 = document.querySelector("#f");
let c1 = document.querySelector("#c");

c1.addEventListener("click", function() {

    let serchInput1 = document.querySelector("#search-text").value;


    ////////////
    let newUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${serchInput1}&appid=${key}&units=${unit}`;
    axios.get(newUrl1).then(function(response) {
        let k = document.querySelector("#dg");
        k.innerHTML = Math.round(response.data.main.temp);


    });




});
f1.addEventListener("click", function() {
    let serchInput12 = document.querySelector("#search-text").value;
    let newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${serchInput12}&appid=${key}&units=${unit}`;
    axios.get(newUrl).then(function(response) {
        let k = document.querySelector("#dg");
        let m = Math.round(response.data.main.temp);
        m = (9 * m + 160) / 32;

        k.innerHTML = Math.round(m);


    });




});



////////////////



searchIcon.addEventListener("click", function(event) {
    event.preventDefault();
    let serchInput = document.querySelector("#search-text").value;
    let h = document.querySelector("#heahing-city");

    h.innerHTML = serchInput;
    //////////////
    let newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${serchInput}&appid=${key}&units=${unit}`;
    axios.get(newUrl).then(function(response) {
        let k = document.querySelector("#dg");
        k.innerHTML = Math.round(response.data.main.temp);
        let status1 = document.querySelector("#status");
        status1.innerHTML = response.data.weather[0].main;

        let speed = document.querySelector("#windspeed");
        speed.innerHTML = `Wind :${Math.round(response.data.wind.speed)} km/h `;
        let humidity = document.querySelector("#Humidity");
        humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;


    });



});
////////////////////////
serchInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        let serchInput = document.querySelector("#search-text").value;
        let h = document.querySelector("#heahing-city");


        h.innerHTML = serchInput;


        //////////
        let newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${serchInput}&appid=${key}&units=${unit}`;
        axios.get(newUrl)
            .then(function(response) {

                let k = document.querySelector("#dg");
                k.innerHTML = Math.round(response.data.main.temp);
                let status1 = document.querySelector("#status");
                status1.innerHTML = response.data.weather[0].main;

                let speed = document.querySelector("#windspeed");
                speed.innerHTML = `Wind :${Math.round (response.data.wind.speed)} km/h `;
                let humidity = document.querySelector("#Humidity");
                humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;




            });




    }

});





let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

let date = new Date();

let day = days[date.getDay() - 1];
let min = date.getMinutes();

let h = date.getHours();
h = h < 10 ? `0${h}` : h;
min = min < 10 ? `0${min}` : min;
let today1 = ` ${day}  ${h}:${min}`;


let t = document.querySelector("#today");
t.innerHTML = today1;

////////////



axios.get(apiUrl)
    .then(function(response) {
        let status1 = document.querySelector("#status");
        status1.innerHTML = response.data.weather[0].main;

        let speed = document.querySelector("#windspeed");
        speed.innerHTML = ` Wind :${Math.round(response.data.wind.speed)} km/h `;
        let humidity = document.querySelector("#Humidity");
        humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;



    });



function showTemperature(response) {
    let head = document.querySelector("#heahing-city");
    head.innerHTML = response.data.name;


    let k = document.querySelector("#dg");
    k.innerHTML = Math.round(response.data.main.temp);
    let status1 = document.querySelector("#status");
    status1.innerHTML = response.data.weather[0].main;

    let speed = document.querySelector("#windspeed");
    speed.innerHTML = `Wind :${Math.round(response.data.wind.speed)} km/h `;
    let humidity = document.querySelector("#Humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
}

function setApi(position) {
    let keyApi = "0962dc1fc48ff43b087025aa1e35e11b";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${keyApi}&units=metric`;

    axios.get(apiurl).then(showTemperature);
}

function setPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(setApi);
}

let btn2 = document.querySelector("#current");
btn2.addEventListener("click", setPosition);