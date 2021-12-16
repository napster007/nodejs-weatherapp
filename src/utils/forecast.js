
const request = require("request")

const foreCast = (latitude,longtitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=f1b652536347bbf56c8312b9287ad48f&query=' + longtitude +',' + latitude
    request({url, json:true}, (error, {body}) =>{
                if(error){
                    callback("Cannot Connect to WeatherStack Service", undefined)
                }else if(body.error){
                    callback("Cannot find the Location, Try another search", undefined)
                }else{
                     
                    callback(undefined, body.current.weather_descriptions + '. It is currently ' +  body.current.temperature + ' there is a ' +  body.current.precip +'% chance of rain.' + '\n  Weather Description: \n \t Wind Speed: ' + body.current.wind_speed + '\n \t Wind Degree: ' + body.current.wind_degree )
                    // callback(undefined, {
                    //     latitude:latitude,
                    //     longtitude: longtitude,
                    //     location:place
                    // })


                    // JSON.stringify( {
                    //         latitude:latitude,
                    //         longtitude: longtitude,
                    //         location:place
                    //     });
                }
    })
}

module.exports = {
    foreCast: foreCast
}