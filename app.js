function getWindDirection(degrees) {
    if (degrees >= 337.5 || degrees < 22.5) return 'N'; // Norte
    if (degrees >= 22.5 && degrees < 67.5) return 'NE'; // Noreste
    if (degrees >= 67.5 && degrees < 112.5) return 'E'; // Este
    if (degrees >= 112.5 && degrees < 157.5) return 'SE'; // Sureste
    if (degrees >= 157.5 && degrees < 202.5) return 'S'; // Sur
    if (degrees >= 202.5 && degrees < 247.5) return 'SO'; // Suroeste
    if (degrees >= 247.5 && degrees < 292.5) return 'O'; // Oeste
    if (degrees >= 292.5 && degrees < 337.5) return 'NO'; // Noroeste
}

window.addEventListener("load", () => {

    if(!navigator.geolocation){
        console.log("geolocation is not available");
        const localContainer = document.getElementById("local-container")
        geolocationNotAvailableTitle = document.createElement("h2")
        geolocationNotAvailableTitle.textContent = "La geolocalización no está disponible"
        geolocationNotAvailableTitle.className = "geolocation-not-available-message"
        localContainer.appendChild(geolocationNotAvailableTitle)
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const APIKey = 'aae1dd9179f8f2a1e3fafc2c22104461'
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const urlOpenWeatherMap = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${APIKey}`

        fetch(urlOpenWeatherMap)
        .then((response) => {
            if(!response.ok){
                throw new Error(`HTTP ERROR! status: ${response.status}`)
            }
            return response.json()
        })
        .then((data) => {
            const localContainer = document.getElementById('local-container')

            const divWeather = document.createElement('div')
            divWeather.className = 'div-weather'

            const cityName = document.createElement('h2')
            cityName.textContent = data.name
            cityName.className = 'title-city'

            const icon = data.weather[0].icon            
            const iconImage = document.createElement('img')
            iconImage.src = `https://openweathermap.org/img/wn/${icon}.png`
            iconImage.className = 'icon-image'
            const divImage = document.createElement('div')
            divImage.appendChild(iconImage)
            divImage.className = 'div-image'

        
            const sky = document.createElement('p')
            sky.textContent = data.weather[0].description
            sky.className = 'temperatura'

            const cityTemp = document.createElement('p')
            cityTemp.textContent = `${data.main.temp}°C`
            cityTemp.className = 'temperatura'

            const feelingLike = document.createElement('p')
            feelingLike.textContent = `Sensación térmica: ${data.main.feels_like}°C`
            const minTemp = document.createElement('p')
            minTemp.textContent = `Temp min: ${data.main.temp_min}°C`
            const maxTemp = document.createElement('p')
            maxTemp.textContent = `Temp. max: ${data.main.temp_max}°C`
            const humidity = document.createElement('p')
            humidity.textContent = `Humedad: ${data.main.humidity}%`
            const wind = document.createElement('p');
            const windDirection = getWindDirection(data.wind.deg)
            wind.textContent = `Viento a ${data.wind.speed} m/s con direccion ${windDirection}`;

            const divData = document.createElement('div')
            divData.append(sky, cityTemp, feelingLike, minTemp, maxTemp, humidity, wind)


            const divMain = document.createElement('div')
            divMain.append(divImage,divData)
            divMain.className = 'container-img-data'


            divWeather.append(cityName, divMain)
            

            localContainer.appendChild(divWeather)
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('No se pudo encontrar la ciudad. Por favor, verifica el nombre e intenta de nuevo.');
        });
        
    })

})

document.getElementById('search-button').addEventListener('click', () => {
    const cityName = document.getElementById('input-city').value.trim()
    
    if(!cityName){
        alert('Instroduzca una ciudad en el buscador')
        return
    }

    const APIKey = 'aae1dd9179f8f2a1e3fafc2c22104461'
    const urlOpenWeatherMap = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=es&appid=${APIKey}`

    fetch(urlOpenWeatherMap)
    .then((response) => {
        if(!response.ok){
            throw new Error(`HTTP ERROR! status: ${response.status}`)
        }
        return response.json()
    })
    .then((data) => {
        const divWeather = document.createElement('div')
        divWeather.className = 'div-weather'

        const cityName = document.createElement('h2')
        cityName.textContent = data.name
        cityName.className = 'title-city'

        const icon = data.weather[0].icon            
        const iconImage = document.createElement('img')
        iconImage.src = `https://openweathermap.org/img/wn/${icon}.png`
        iconImage.className = 'icon-image'
        const divImage = document.createElement('div')
        divImage.appendChild(iconImage)
        divImage.className = 'div-image'

    
        const sky = document.createElement('p')
        sky.textContent = data.weather[0].description
        sky.className = 'temperatura'

        const cityTemp = document.createElement('p')
        cityTemp.textContent = `${data.main.temp}°C`
        cityTemp.className = 'temperatura'

        const feelingLike = document.createElement('p')
        feelingLike.textContent = `Sensación térmica: ${data.main.feels_like}°C`
        const minTemp = document.createElement('p')
        minTemp.textContent = `Temp min: ${data.main.temp_min}°C`
        const maxTemp = document.createElement('p')
        maxTemp.textContent = `Temp. max: ${data.main.temp_max}°C`
        const humidity = document.createElement('p')
        humidity.textContent = `Humedad: ${data.main.humidity}%`
        const wind = document.createElement('p');
        const windDirection = getWindDirection(data.wind.deg)
        wind.textContent = `Viento a ${data.wind.speed} m/s con direccion ${windDirection}`;

        const divData = document.createElement('div')
        divData.append(sky, cityTemp, feelingLike, minTemp, maxTemp, humidity, wind)


        const divMain = document.createElement('div')
        divMain.append(divImage,divData)
        divMain.className = 'container-img-data'

        divWeather.append(cityName, divMain)

        const citySearched = document.getElementById('city-searched')
        
        citySearched.innerHTML = ''

        citySearched.appendChild(divWeather)
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('No se pudo encontrar la ciudad. Por favor, verifica el nombre e intenta de nuevo.');
    });
})