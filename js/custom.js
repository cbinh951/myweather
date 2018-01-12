//get current location   
$.ajax({
    url: "https://geoip-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(location) {
        $('#city').val(location.city);
    }
}); 

//autocomple address
function initialize() {
  var input = document.getElementById('city');
  var options = {
        types: ['(cities)']
    };
  var autocomplete = new google.maps.places.Autocomplete(input, options);
}
google.maps.event.addDomListener(window, 'load', initialize);

//click get information 
$("#submitWeather").click(function(){
    var city = $("#city").val();
    $("#kind_day").html('');
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=metric&APPID=38cf54881f69412359a802e3bd7a8ed5',
        type: "GET",
        dataType: "json",
        success: function(data){
            console.log(data);
            $("#showData").html(showData(data));
            $("#kind_day").html(statusDay(data.weather[0].id));
        },
        error: function(error){
            $("#showData").html("<div class='alert alert-danger not_found'><strong>City not found</strong></div>");
        }
    });
});

function showData(data){
    var html = "<table class='table'><thead><tr><th>Title</th><th>Description</th></tr></thead><tbody>" +
                "<tr><td>City name</td><td>" + data.name + "</td></tr>" +
                "<tr><td>Weather</td><td><img src='http://openweathermap.org/img/w/"+ data.weather[0].icon +".png'>" + data.weather[0].main + "</td></tr>" +
                "<tr><td>Description</td><td>" + data.weather[0].description + "</td></tr>" +
                "<tr><td>Sunrise</td><td>" + convertTime(data.sys.sunrise) + "</td></tr>" +
                "<tr><td>Sunset</td><td>" + convertTime(data.sys.sunset) + "</td></tr>" +
                "<tr><td>Humidity</td><td>" + data.main.humidity + "%</td></tr>" +
                "<tr><td>Wind</td><td>" + convertWindToDirection(data.wind.deg) + "</td></tr>" +
                "<tr><td>Temperature</td><td>" + data.main.temp + " Celsius / " + convertCelsiusToFahrenheit(data.main.temp) +" Fahrenheit</td></tr>" +
                "<tr><td><strong>Determine</strong></td><td><strong>" + determine(data.weather[0].id) + "</strong></td></tr>" +
                "</tbody></table>";
    return html;
}

function convertTime(time){
    return new Date(1000 * time).toLocaleTimeString();
}

function convertWindToDirection(degree) {
    if(typeof degree != 'undefined'){
        var sectors = ['Northerly','North Easterly','Easterly','South Easterly','Southerly','South Westerly','Westerly','North Westerly'];
        degree += 22.5;
        if (degree < 0){ 
            degree = 360 - Math.abs(degree) % 360;
        }
        else{ 
            degree = degree % 360;
        }
        var which = parseInt(degree / 45);
        return sectors[which];
    }
    return 'Northerly';
}
  
function statusDay(code){
    if(code <= 232){
        $('body').css('background-image', 'url(http://cuocthianh.kttvqg.gov.vn//upload/gallery/26075_Dong%20Truong%20Sa_compressed.jpg)');
        return "Storm today, please be careful";
    }
    if(code <= 531){
        $('body').css('background-image', 'url(http://2.bp.blogspot.com/-xaL634oQYbY/UrI6u93LXhI/AAAAAAAAOcQ/kRC0EqDYlYg/s1600/rain-249872.jpg)');
        return "Today the sky has rain. You should bring an umbrella when you go out";
    }
    if(code <= 622){
        $('body').css('background-image', 'url(http://giaimabian.net/wp-content/uploads/2017/03/4.Rung-cay-tuyet-tren-nui-Taebaeksan.jpg)');
        return "Today the sky has snow. You should keep your body";
    }
    if(code >= 800 && code <= 804 || code >= 951 && code <= 955){
        $('body').css('background-image', 'url(http://www.pptbackgroundstemplates.com/800x600/blue-star-shine-backgrounds.jpg)');
        return "It's a nice day";
    }
    return "Today's bad weather. You should stay home";
}

function convertCelsiusToFahrenheit(degree){
    x = degree * 1.8 + 32;
    var n = parseFloat(x); 
    return Math.round(n * 1000)/1000;
}

function determine(code){
    if(code >= 300 && code <= 321 || code >= 500 && code <= 531){
        return "Person needs an umbrella";
    }
    return "Person needs a coat";
}