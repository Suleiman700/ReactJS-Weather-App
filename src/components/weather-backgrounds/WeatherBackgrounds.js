
import CloudsBackground from "./CloudsBackground";
import RainBackground from "./RainBackground";

function WeatherBackgrounds(_weather) {
    const weatherName = _weather['weatherName'] // example: Clouds, Clear...etc

    switch (weatherName) {
        case 'Clouds':
            return <CloudsBackground />
        case 'Rain':
            return <RainBackground />
        case 'Clear':
            return ''
    }
}

export default WeatherBackgrounds