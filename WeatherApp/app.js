
// api key : 82005d27a116c2880c8f0fcb866998a0
let  key = "82005d27a116c2880c8f0fcb866998a0";
const tempElem=document.querySelector(".temperature-value p");
tempElem.innerHTML="..!";
const iconElem=document.querySelector(".weather-icon");
const discriptionElem=document.querySelector(".temperature-description p");
const locationElem=document.querySelector(".location p");

weatherObj={
    temp:{
        value:"",
        unit:"C"
    },
    iconElem:"./icons/unknown.png",
    discription:"Ops",
    city:"",
    country:''
};

if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log("no internet");
}
else{
    alert("Please Allow your location Acces ");
}
function showPosition(position){
    console.log("In showPosition");
    let lat=position.coords.latitude;
    let log=position.coords.longitude;
    console.log(lat +"\n" + log);
    getWeather(lat,log);
}

function getWeather(lat,log){
    let kel=273;
    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${key}`;
    fetch(api)
        .then(function(response){
            let data=response.json();
            return data;
        })
        .then(function(data){
            weatherObj.temp.value=Math.floor(data.main.temp - kel);
            weatherObj.iconElem=data.weather[0].icon;
            weatherObj.discription=data.weather[0].main;
            weatherObj.city=data.name;
            weatherObj.country=data.sys.country;
        })
        .then(function(){
            displayAll();
        })
}
function displayAll(){
    tempElem.innerHTML=`${weatherObj.temp.value}°<span>C</span>`;
    iconElem.innerHTML=`<img src="./icons/${weatherObj.iconElem}.png"/>`;
    discriptionElem.innerHTML=`${weatherObj.discription}`;
    locationElem.innerHTML=`${weatherObj.city} , ${weatherObj.country}`;
    console.log(weatherObj.iconElem);
}
tempElem.addEventListener("click",function(){
    if(weatherObj.temp.unit=="C"){
        weatherObj.temp.unit="F";
        let farenhit=Math.floor((9/5*weatherObj.temp.value)+32);
       // console.log(farenhit);
        tempElem.innerHTML=`${farenhit}°<span>F</span>`;
    }
    else if(weatherObj.temp.unit=="F"){
        weatherObj.temp.unit="C";
        tempElem.innerHTML=`${weatherObj.temp.value}°<span>C</span>`;
    }
})