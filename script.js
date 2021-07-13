let current_time=document.querySelector('.current_time')
let arrow_btn=document.querySelector('.arrow_btn')
let info_container=document.querySelector('.info_container')
let right_arrow=document.querySelector('.right_arrow')
let locationPlace=document.querySelector('.location')
let city_name=document.querySelector('.city')
let country_name=document.querySelector('.country')
let temp=document.querySelector('.temp')
let min_temp=document.querySelector('.min_temp')
let max_temp=document.querySelector('.max_temp')
let humidity=document.querySelector('.humidity')
let pressure=document.querySelector('.pressure')
let wind_speed=document.querySelector('.wind_speed')
let wind_direction=document.querySelector('.wind_direction')
let weather_logo=document.querySelector('.weather_logo')
let description=document.querySelector('.description')
let form=document.querySelector('#form')
let search=document.querySelector('#search')

//hanburger
let hamburger=document.querySelector('.hamburger')
       let menu=document.querySelector('.menu')
       hamburger.addEventListener('click',()=>{
           menu.classList.toggle('menu_toggle')
       })

//dateTime function
function current_time_func(){
    let date=new Date()
    let year=date.getFullYear()
    let month=date.getMonth()+1
    if(month<10){
        month="0"+month
    }
    let day=date.getDate()
    if(day<10){
        day="0"+day
    }
    let hour=date.getHours()
    if(hour<10){
        hour="0"+hour
    }
    let minute=date.getMinutes()
    if(minute<10){
        minute="0"+minute
    }
    let seconds=date.getSeconds()
    if(seconds<10){
        seconds="0"+seconds
    }
    let dateTimeInfo=`Current Date and Time of India: ${year}-${month}-${day}, ${hour}:${minute}:${seconds}`
    current_time.innerHTML=dateTimeInfo 
}
current_time_func()
setInterval(current_time_func,1000)

//event on button
arrow_btn.addEventListener('click',()=>{
    info_container.classList.toggle('info_container_extend')
    right_arrow.classList.toggle('right_arrow_transform')
})

let baseUrl='https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=36d6fa7ab50bcf21c260774e7f045cb2&units=metric'
//basedata function
async function baseData(){
    let response=await fetch(baseUrl);
    let responseData=await response.json()
    weatherData(responseData)
    console.log(responseData)
    console.log(responseData.weather[0])
}
baseData()
//weather data function
function weatherData(data){
    let iconCode=data.weather[0].icon
    let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    weather_logo.children[0].src=iconUrl
    description.innerHTML="Description: "+data.weather[0].description
    country_name.innerHTML=data.sys.country
    city_name.innerHTML=data.name
    temp.innerHTML=data.main.temp+"°C"
    min_temp.innerHTML="Min Temp: "+data.main.temp_min+"°C"
    max_temp.innerHTML="Max Temp: "+data.main.temp_max+"°C"
    humidity.innerHTML="Humidity: "+data.main.humidity+"%"
    pressure.innerHTML="Pressure: "+data.main.pressure+"hPa"
    wind_speed.innerHTML="Wind Speed: "+data.wind.speed+" "+"meter/sec "
    wind_direction.innerHTML="Wind Direction: "+data.wind.deg+" "+"degrees "
}

//searchData function for searching places
async function searchData(){
    let placeName=search.value;
    try {    
        let searchUrl=`https://api.openweathermap.org/data/2.5/weather?q=${placeName}&appid=36d6fa7ab50bcf21c260774e7f045cb2&units=metric`
        let response=await fetch(searchUrl);
        let responseData=await response.json()
        weatherData(responseData)
    } catch {
        alert("place not found! please search other places")
    }
    search.value=""
}
//event on form element
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(search.value){
        searchData()
    }
    else{
        alert("please enter place name")
    }
})

//snow falling function
function snowFall(){
    let elem=document.createElement('h3')
    elem.classList.add('snow')
    elem.innerText="🌨"
    elem.style.left=Math.random()*100+5+"vw"
    elem.style.animationDuration=Math.random()+1+"s"
    document.body.append(elem)
    setTimeout(() => {
        elem.remove()
    }, 2000);
}
setInterval(() => {
    snowFall()
}, 200);