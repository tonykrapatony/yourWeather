let lat = "", 
    lon = "",
    count = 0,
    result = "",
    current = "",
    citySearchList = "";
let cities = [
    {id: 1, name: "Kyiv"},
    {id: 2, name: "Lviv"},
    {id: 3, name: "Kharkiv"},
    {id: 4, name: "Odesa"},
    {id: 5, name: "Donetsk"},
    {id: 6, name: "Dnipro"},
    {id: 7, name: "Rivne"},
    {id: 8, name: "Mariupol"},
    {id: 9, name: "Vinnytsia"},
    {id: 10, name: "Zhytomyr"},
    {id: 11, name: "London"},
    {id: 12, name: "Liverpool"},
    {id: 13, name: "Manchester"},
    {id: 14, name: "Leeds"},
    {id: 15, name: "Birmingham"},
    {id: 16, name: "Nottingham"},
    {id: 16, name: "Wolverhampton"},
    {id: 18, name: "Gamburg"},
    {id: 19, name: "Berlin"},
    {id: 20, name: "Munich"},
    {id: 21, name: "Cologne"},
    {id: 22, name: "Bochum"},
    {id: 23, name: "Gelsenkirchen"},
    {id: 24, name: "Hamburg"},
    {id: 25, name: "Leverkusen"},
    {id: 26, name: "Paris"},
    {id: 27, name: "Marseille"},
    {id: 28, name: "Metz"},
    {id: 28, name: "Lyon"},
    {id: 30, name: "Cannes"},
    {id: 31, name: "Brussels"},
    {id: 32, name: "Monaco"},
    {id: 33, name: "Madrid"},
    {id: 34, name: "Barcelona"},
    {id: 35, name: "Valencia"},
    {id: 36, name: "Seville"},
    {id: 37, name: "Zaragoza"},
    {id: 38, name: "Lisbon"},
    {id: 39, name: "Porto"},
    {id: 40, name: "Coimbra"},
    {id: 41, name: "Braga"},
    {id: 42, name: "Zagreb"},
    {id: 43, name: "Prague"},
    {id: 44, name: "Brno"},
    {id: 45, name: "Ostrava"},
    {id: 46, name: "Vienna"},
    {id: 47, name: "Graz"},
    {id: 48, name: "Linz"},
    {id: 49, name: "Salzburg"},
    {id: 50, name: "Amsterdam"},
]
// render search list of cities
let newCities = cities.slice();
document.querySelector('.city').addEventListener('keyup', (event) => {
    let input = document.querySelector('.city').value;
    if(input.length < count){
        count--;
        newCities = cities.slice();
        for (let i=0; i<input.length; i++){
            newCities = newCities.filter(item => item.name[i].toLowerCase().includes(input[i].toLowerCase()));
            let searchList = document.querySelector('.search_list');
            newCities.forEach(el => {
                let searchListItem = `<li class="search_list_item" data-id="${el.id}">${el.name}</li>`
                citySearchList += searchListItem;
                searchList.innerHTML = citySearchList;
            });
            citySearchList = "";
        }
    } else {
        newCities = newCities.filter(item => item.name[count].toLowerCase().includes(input[count].toLowerCase()));
        let searchList = document.querySelector('.search_list');
        newCities.forEach(el => {
            let searchListItem = `<li class="search_list_item" data-id="${el.id}">${el.name}</li>`
            citySearchList += searchListItem;
            searchList.innerHTML = citySearchList;
        });
        citySearchList = "";
        count++;
    }
    
});
// starts the function after click on city search item
document.querySelector('.search_list').addEventListener('click', (event) => {
    document.querySelector('.city').value = event.target.textContent;
    if (document.querySelector('.list_weather').textContent === ""){
        showWeather();
    } else {
        document.querySelector('.list_weather').innerHTML = "";
        $(document).ready(function(){
            $('.list_weather').slick('unslick');
        });
        showWeather();
    }
    document.querySelector('.search_list').innerHTML = "";
    result = "";
    count = 0;
    newCities = cities.slice();
})
// starts the function after click on button show weather
document.querySelector('.show').addEventListener('click', () => {
    if (document.querySelector('.list_weather').textContent === ""){
        showWeather();
    } else {
        document.querySelector('.list_weather').innerHTML = "";
        $(document).ready(function(){
            $('.list_weather').slick('unslick');
        });
        showWeather();
    }
    document.querySelector('.search_list').innerHTML = "";
    result = "";
    count = 0;
    newCities = cities.slice();
});
// fn that get data from API Openweather and then render it on the page
const showWeather = () => {
    document.querySelector('.search_list').innerHTML = ""
        let input = document.querySelector('.city').value,
        cityName = input[0].toUpperCase() + input.slice(1);
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=0&appid=c4077c4d671278d50c0d48f246577f33")
    .then(data => {
        return data.json();
    })
    .then (data => {
        lat = data[0].lat;
        lon = data[0].lon;
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=current,minutely,hourly,alerts&units=metric&appid=c4077c4d671278d50c0d48f246577f33")
        .then(data => {
            return data.json();
        })
        .then (data => {
            let image = ` https://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`,
            current = `<div class="city_name">
                            <img src="./images/town.png" alt="town icon">
                            <strong>${cityName}</strong>
                            <p>${(new Date(data.daily[0].dt*1000)).toDateString()}</p>
                        </div> 
                        <div class="weather_temp">
                            <img class="weather_temp_img" src="${image}" alt="wether icon">
                            <p class="weather_temp_descr">${(data.daily[0].weather[0].description)[0].toUpperCase()}${(data.daily[0].weather[0].description).slice(1)}</p>
                            <p class="weather_temp_deg"><img src="./images/temperature.png" alt="temperature icon"> Temperatur ${Math.round(data.daily[0].temp.day)} &#176;C</p> 
                            <p class="weather_temp_deg"><img src="./images/temperature.png" alt="temperature icon"> Feels like ${Math.round(data.daily[0].feels_like.day)} &#176;C</p> 
                        </div> 
                        <div class="weather_wind">
                            <img src="./images/wind.png" alt="wind icon">
                            Wind speed: ${data.daily[0].wind_speed} m/s
                        </div>
                        <div class="weather_sun">
                            <div><img src="./images/sunrise.png" alt="sunrise icon"> Sunrise: ${(new Date(data.daily[0].sunrise*1000)).toLocaleTimeString()}</div>
                            <div><img src="./images/sunset.png" alt="sunset icon"> Sunset: ${(new Date(data.daily[0].sunset*1000)).toLocaleTimeString()}</div>
                            </div>
                        </div>`;
            document.querySelector('.current_weather').innerHTML = current;
            for (let k in data.daily) {
                let image = ` https://openweathermap.org/img/wn/${data.daily[k].weather[0].icon}.png`,
                sunrise = (new Date(data.daily[k].sunrise*1000)).toLocaleTimeString();
                sunset = (new Date(data.daily[k].sunset*1000)).toLocaleTimeString();
                result += `<li class="list_weather_item">
                            <div data-id="${k}" class="id_wrap"></div>
                            <div data-id="${k} class="list_weather_item_city_name">
                                <strong>${cityName}</strong>
                                <p>${(new Date(data.daily[k].dt*1000)).toLocaleDateString()}</p>
                            </div> 
                            <div data-id="${k} class="list_weather_item_weather_temp">
                                <img class="weather_temp_img" src="${image}" alt="wether icon">
                                <p class="weather_temp_deg"><img src="./images/temperature.png" alt="temperature icon">${Math.round(data.daily[k].temp.day)} &#176;C</p> 
                            </div> 
                        </li>`;
            }
            document.querySelector('.list_weather').innerHTML = result;
            $(document).ready(function(){
                $('.list_weather').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false,
                    responsive: [
                        {
                            breakpoint: 520,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            }
                        },
                    ]
                });
            });
            document.querySelector('.list_weather').addEventListener('click', (event) => {
                let id = (event.target).getAttribute('data-id');
                current = `<div class="city_name">
                            <img src="./images/town.png" alt="town icon">
                            <strong>${cityName}</strong>
                            <p>${(new Date(data.daily[id].dt*1000)).toLocaleDateString()}</p>
                        </div> 
                        <div class="weather_temp">
                            <img class="weather_temp_img" src="https://openweathermap.org/img/wn/${data.daily[id].weather[0].icon}@2x.png" alt="wether icon">
                            <p class="weather_temp_descr">${(data.daily[id].weather[0].description)[0].toUpperCase()}${(data.daily[id].weather[0].description).slice(1)}</p>
                            <p class="weather_temp_deg"><img src="./images/temperature.png" alt="temperature icon"> Temperatur ${Math.round(data.daily[id].temp.day)} &#176;C</p> 
                            <p class="weather_temp_deg"><img src="./images/temperature.png" alt="temperature icon"> Feels like ${Math.round(data.daily[id].feels_like.day)} &#176;C</p> 
                        </div> 
                        <div class="weather_wind">
                            <img src="./images/wind.png" alt="wind icon">
                            Wind speed: ${data.daily[id].wind_speed} m/s
                        </div>
                        <div class="weather_sun">
                            <div><img src="./images/sunrise.png" alt="sunrise icon"> Sunrise: ${(new Date(data.daily[id].sunrise*1000)).toLocaleTimeString()}</div>
                            <div><img src="./images/sunset.png" alt="sunset icon"> Sunset: ${(new Date(data.daily[id].sunset*1000)).toLocaleTimeString()}</div>
                            </div>
                        </div>`;
                document.querySelector('.current_weather').innerHTML = current;
            })
        })
    })
    .catch(error => {
        document.querySelector('.list_weather').innerHTML = "Please enter name of your city, town or country";
    })
}