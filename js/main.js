function formatData(timestemp) {
    let days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    let data = new Date(timestemp);
    let h = data.getHours();
    let m = data.getMinutes();
    if (m < 10) {
        m = `0${m}`;
    }
    if (h < 10) {
        h = `0${h}`;
    }
    let d = days[data.getDay() - 1];

    return `${d} ${h}:${m}`;
}
//
function displayTempruture(response) {
    let cityName = document.querySelector("#city");
    cityName.innerHTML = response.data.name;

    let temp = document.querySelector("#temprature");
    temp.innerHTML = Math.round(response.data.main.temp);
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;

    let Humidity = document.querySelector("#Humidity");
    Humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

    let dataelement = document.querySelector("#data");
    dataelement.innerHTML = formatData(response.data.dt * 1000);

    let iconElement = document.querySelector("#icon");

    cels = response.data.main.temp;

    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
}
//
function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input").value;
    search(cityInput);
}
//
function search(city) {
    let key = "0962dc1fc48ff43b087025aa1e35e11b";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    axios.get(apiUrl).then(displayTempruture);
}

//

//

function showFarenheitTemptature(event) {
    event.preventDefault();

    let farenheitelement = document.querySelector("#temprature");
    c.classList.remove("active");
    f.classList.add("active");
    farenheitelement.innerHTML = Math.round((cels * 9) / 5 + 32);
}

function showCelsTemprature(event) {
    event.preventDefault();
    f.classList.remove("active");
    c.classList.add("active");
    let celselement = document.querySelector("#temprature");
    celselement.innerHTML = Math.round(cels);
}

let f = document.querySelector("#farenheit");
f.addEventListener("click", showFarenheitTemptature);

let c = document.querySelector("#cels-link");
c.addEventListener("click", showCelsTemprature);

let cels = null;

let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);

form.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleSubmit();
    }
});

search("tehran");