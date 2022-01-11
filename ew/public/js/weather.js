let inputCity=document.getElementById("inputCity");
const search=document.getElementById("search");
let city_name=document.getElementById("city_name");
let temprature=document.getElementById("temprature");
let country=document.getElementById("country");
const day=document.getElementById("day");
const date=document.getElementById("date");
const weather_condition=document.getElementById("weather_condition");
let clock=document.getElementById("clock");
let weather_image=document.getElementById("weatherbody");

weather_condition.innerHTML="";





// ........................sysdate  DAY.......................................
const sysDate= new Date();
console.log(sysDate);
var dayName=['SUNDAY','MONDAY','TUEDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
const getDay=dayName[sysDate.getDay()];

day.innerText=getDay;


// ..........................sysdate DATE................................
var months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const getdate=sysDate.getDate();
 const getmonth=months[sysDate.getMonth()];
 const getyear=sysDate.getFullYear();
 console.log(getdate);
 console.log(getmonth);
 console.log(getyear);

date.innerText=getdate +" "  +getmonth + " " + getyear;

// ........................clock................................


 
function showTime(){
  const time=new Date()
var hours=time.getHours();
var min=time.getMinutes();
var sec=time.getSeconds();
var getTime=time.toLocaleTimeString();

clock.innerHTML= getTime;
console.log(hours + ":" + min+ ":" + sec);

}
showTime();
setInterval(showTime , 1000);
// .........................background change day and nighyt............................
const hours=sysDate.getHours();
if(hours>19)
{
  weather_image.style.backgroundImage = "url('images/night.jpg')";
  weather_image.style.backgroundRepeat="no-repeat";
  weather_image.style.backgroundSize = "1400px 600px";

}
else
{
  weather_image.style.backgroundImage = "url('images/claersky.jpg')";
  weather_image.style.backgroundRepeat="no-repeat";
  weather_image.style.backgroundSize = "1500px 1000px";
}

 // ......................api..................................

 //......if we not use asyn await... before fetch data  from api, program will print data to console,whih is pending stateof promise..
const getInfo=async(err)=>{
  err.preventDefault();
  let inputCityVal=inputCity.value;
  

  if(inputCityVal == "")
  {
      city_name.innerText="Please enter city !!! " ;
      country.innerText="";
        temprature.innerText="";
        weather_condition.innerText="";
        weather_condition.innerHTML="";

  }
  else
  { 
   try{
         let url=`http://api.openweathermap.org/data/2.5/weather?q=${inputCityVal}&units=metric&appid=64e0ad8f0beb4446fdee7903adce0c46`;
         
         const responseAPI= await fetch(url);
         //convert readlestream to object
         //to convet from JSON to OBJ.....JSON.json();
         //JSON.parse expects a JSON-formatted string, but you give it a Response object, which is not JSON, hence the parsing error.

//         res.json() extracts the JSON-formatted data from the Response object and converts the data into a JavaScript object.
        //JSON.parse()  is a JavaScript thing. It parses a string containing JSON into whatever that string represents. You don't pass it objects. Clearly, your err isn't a string.

         const jsonDatafromAPI= await responseAPI.json();//jab fetch ho jye tab tk wait krna h uske bad js json me convert krma h
          const array=[jsonDatafromAPI];
          console.log(array);

          city_name.innerText=`${inputCityVal}`+ ","+array[0].sys.country;
         temprature.innerText=array[0].main.temp +"˚C";
       


// ......................change icon.............................................

        if(array[0].weather[0].description == "clear sky")
        {
          weather_condition.innerHTML= `<p id="weather_condition"><i class="fa fa-sun" style="color: yellow;"></i></p>`;
        }
        
        
        else if(array[0].weather[0].main =="Clouds")
        {
          if(array[0].weather[0].description == "broken clouds" || array[0].weather[0].description == "overcast clouds")
          {
            weather_condition.innerHTML= `<p id="weather_condition"><i class="fas fa-sun " style="color: yellow;"></i></p>`;
          }
          else
          {
             weather_condition.innerHTML= `<p id="weather_condition"><i class="fas fa-cloud "  style="color:rgb(169, 169, 238) ;"></i></p>`;
          }
        }


        else if(array[0].weather[0].main =="Haze")
        { 
          weather_condition.innerHTML= `<p id="weather_condition"> <i class="fas fa-smog"  style="color:grey;"></i></p>`;
        }



        else if(array[0].weather[0].main =="Rain")
        {
          weather_condition.innerHTML= `<p id="weather_condition"><i class="fas fa-cloud-showers-heavy" style="color:rgb(15, 169, 240);"></i> </p>`;
        }
       

   }
  
   catch{
      city_name.innerText="City not found....";
      country.innerText="";
      temprature.innerText="";
      weather_condition.innerText="";
      weather_condition.innerHTML="";
   }
  }

}
search.addEventListener('click',getInfo);



