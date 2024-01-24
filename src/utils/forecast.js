const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=374b94296fa61303ed1b77ce5d708320&query=${lat},${long}`;
    request({
        url, 
        json:true,
    }, (error,response,body) =>{
        if(error){
            callback('Weather api is unavailable.',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined);
        }
        else{
            const current = body.current
            callback(undefined,`It is currently ${current.temperature} degress out. It feels like ${current.feelslike} degress out.`);
        }
    })
}

module.exports = forecast