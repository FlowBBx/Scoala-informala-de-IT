let state = {};
let state_2 = {};

const filteredData = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
};

async function getData (){
    let design = document.querySelector("#add")
    let input = document.querySelector("[name='location']").value;
    let data = await fetch("https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=" + input);
    let response = await data.json();
    state = response;
    let theDiv = document.querySelector("#add");
    for(let [i,date] of Object.entries(state)) {
        theDiv.innerHTML = 
        `
        <div>
            <img src="http://openweathermap.org/img/w/${state.weather[0].icon}.png"><br>
            <p>Description:<b> ${state.weather[0].description}</b></p><br>
            <p>Humidity: <b>${state.main.humidity} % </b></p><br>
            <p>Pressure: <b>${state.main.pressure} mb </b></p><br>
            <p>Current temperature: <b>${state.main.temp}°C</b> </p><br>
            <p>The minimum of the day: <b>${state.main.temp_min}°C</b></p><br>
            <p>The maximum of the day: <b>${state.main.temp_max} °C</b></p><br>  
        </div>
        <div>
        <iframe
            width="400"
            height="350"
            style="border:2"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDHvonzBbDrnsxGBxNav9axCruOxJbIE_c
                &q=${input}">
        </iframe>
        </div>
            `   
    }
    design.classList.add("forAdd")
    classAdd();
    
}

async function getWeather() {
    removeHTML ();
    let input = document.querySelector("[name='location']").value;
    let data_base = await fetch ("https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=" + input);
    let response = await data_base.json();
    state_2 = response.list;
    filterData(); 
    let theDiv = document.querySelectorAll("#add2 .day");
    
    for(j=0; j<=5; j++){
        for(i=0; i<filteredData[j].length;i++) {
            theDiv[j].innerHTML+= 
            `   
                <span >
                    <p>Day: ${filteredData[j][i].dt_txt.slice(0,11)} </p>
                    <img src="http://openweathermap.org/img/w/${filteredData[j][i].weather[0].icon}.png"><br>
                    <p>Hour: ${filteredData[j][i].dt_txt.substr(10)} </p>
                    <p>Temperature: ${filteredData[j][i].main.temp} °C </p>
                    <p>Description: ${filteredData[j][i].weather[0].description} </p>
                 </span>
            `
        }
    }

    let x = document.querySelectorAll("#add2 div");
        for(let val of x) {
            val.classList.add("hidden"); 
        }
    let y = document.querySelector("#add2 #a");
            y.classList.remove("hidden");
            y.classList.add('active');
    
    delete filteredData["0","1","2","3","4","5"]
    filteredData["0"]=[];
    filteredData["1"]=[];
    filteredData["2"]=[];
    filteredData["3"]=[];
    filteredData["4"]=[];
    filteredData["5"]=[];

}

function filterData() {
    let today = Number(state_2[0]['dt_txt'].split('-')[2].split(' ')[0]);
    let number = 0;

    while(number <= 5) {
        for(const item of state_2) {
            if(Number(item['dt_txt'].split('-')[2].split(' ')[0]) === today) {
                filteredData[number].push(item);
            } else {
                if(today + 1 === Number(item['dt_txt'].split('-')[2].split(' ')[0])) {
                    filteredData[number+1].push(item);
                }
                today += 1;
                number += 1;
                
            }
        }
    }
}
function removeHTML (){
    let a = document.querySelectorAll("#add2 .day");
    for(let val of a){
        val.remove();
    }
    
    let non = document.querySelector("#add2");
    non.innerHTML = 
    `
    <div id="a" class="day"></div>
    <div class="day"></div>
    <div class="day"></div>
    <div class="day"></div>
    <div class="day"></div>
    <div class="day"></div>
    `
}

function classAdd (idx) {
    let y = document.querySelector("#add2 #a");
            y.classList.add("hidden");
    let x = document.querySelectorAll("#add2 .day");
        for(let val of x) {
            val.classList.remove("active");   
        }
    x[idx].classList.add("active");
}