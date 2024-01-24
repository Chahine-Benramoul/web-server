const request = require('postman-request')

const geocode = (address, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGFtaWRvdTEyMyIsImEiOiJjbHJwaGJ5bHAwNTg1MmpwZGM3aWU2M2FpIn0.RNF-YpjM9HGU47Lx_LtOfg&limit=1`;

    request({url,json:true}, (error,response,body)=>{
        if(error){
            callback('Unable fetch data from service.', undefined)
        }else if(body.features.length === 0){
            callback('This location does not exist.', undefined)
        }
        else{
            const features = body.features[0];
            const longitude = features.center[0]
            const latitude = features.center[1]
            // console.log(`Lat : ${latitude} Long: ${longitude}`)
            const data = {
                longitude:longitude,
                latitude:latitude,
                location: features.place_name,
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode