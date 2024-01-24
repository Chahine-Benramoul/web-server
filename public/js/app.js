console.log('app js loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })




window.addEventListener('DOMContentLoaded', () => {
    console.log('dom loaded');
    const msgOne = document.querySelector('#msgOne');
    const msgTwo = document.querySelector('#msgTwo');

    const getWeatherData = (location) => fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            //console.log(data);
            if (data.error) {
                console.log(data.error);
                msgOne.textContent = data.error
                // return data.error;
            }
            else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
                // return data;
            }
        })
    })

    document.querySelector('#weather-form').addEventListener('submit', (event) => {
        event.preventDefault();
        msgOne.textContent = 'Loading...'
        const location = document.querySelector('#location').value;
        console.log(location)
        getWeatherData(location);

    })
})