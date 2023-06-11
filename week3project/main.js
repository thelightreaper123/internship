const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
inputfield = inputPart.querySelector("input"),
infotxt = inputPart.querySelector(".info-txt"),
icons = document.querySelector(".weather-part img"),
backarrow = wrapper.querySelector(".h1 i"),
searchhistory = wrapper.querySelector(".searches");
let api;


backarrow.addEventListener("click", function(){
    wrapper.classList.remove("active");
});

inputfield.addEventListener("keyup", function(e){
if(e.key === "Enter" && inputfield.value != ""){
    requestApi(inputfield.value); 
    setTimeout(() => {
        var paragraph = document.createElement("p");
        paragraph.innerText = inputfield.value;
         searchhistory.appendChild(paragraph);
  }, 3000);      
}
});

var apiKey = 'a9bc860599772b42085366737fb5388d';
function requestApi(city){
   api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        infotxt.innerText = "Getting weather details";
    infotxt.classList.add("pending");
    fetchdata();
}

async function fetchdata(){
    
    try{
        const response = await fetch(api).then(response => response.json()).then(result => weatherDetails(result));
    } catch(error){
        alert("error fetching data refresh page");
    }
    
}

function weatherDetails(info){
    infotxt.classList.replace("pending", "error");
    if(info.cod == "404"){
     infotxt.innerText = `${inputfield.value} isnt a valid city name`;
    }
    else{
        const city = info.name;
        const country = info.sys.country
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if(id == 800){
        icons.src = "images/clear.png"
        } else if(id >= 200 && id<= 232){
        icons.src = "images/storm.svg"
        }else if(id >= 600 && id<= 622){
        icons.src = "images/snow.png"
       }else if(id >= 701 && id<= 781){
       icons.src = "images/mist.png"
        } else if(id >= 801 && id<= 804){
         icons.src = "images/clouds.png"
        }else if(id >= 300 && id<= 321){
       icons.src = "images/drizzle.png"
       }else if(id >= 500 && id<= 521){
       icons.src = "images/rain.png"
       }

        wrapper.querySelector(".temp .num").innerText = temp;
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .num-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
        infotxt.classList.remove("pending", "error"); 
        wrapper.classList.add("active");
        console.log(info);
    }
}



