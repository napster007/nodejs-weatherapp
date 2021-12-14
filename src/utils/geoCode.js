
const request = require("request")

const geoCode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmFwc3RlcjAwNyIsImEiOiJja3dzczRkNDYxN2Y1Mm9wNHp6em5lZWRxIn0.2iqzwV3_ZC2jfw7rxufs1A&limit=1'
    request({url, json:true}, (error, {body}) =>{
                if(error){
                    callback("Cannot Connect to GeoLocation Service", undefined)
                }else if(body.features.length === 0){
                    callback("Cannot find the Location, Try another search", undefined)
                }else{
                     const latitude =  body.features[0].center[1]
                     const longtitude =  body.features[0].center[0]
                     const location = body.features[0].place_name
                    callback(undefined, {
                        latitude:latitude,
                        longtitude: longtitude,
                        location:location
                    })
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
    geoCode: geoCode
}