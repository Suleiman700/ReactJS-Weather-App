import React, {useEffect} from 'react';
import {useState} from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFrown} from '@fortawesome/free-solid-svg-icons';
import WeatherBackgrounds from "./weather-backgrounds/WeatherBackgrounds";

function Weather() {
    const [query, setQuery] = useState();
    const [weather, setWeather] = useState({
        loading: false,
        data: {},
        error: false,
    });

    const toDate = () => {
        // let date = new Date();
        // const today = date.toDateString();
        // return today;
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'Nocvember',
            'December',
        ];
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
            months[currentDate.getMonth()]
        }`;
        return date;
    };

    const search = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setQuery('');
            setWeather({...weather, loading: true});
            const url = process.env.REACT_APP_API_URL;
            const appid = process.env.REACT_APP_API_KEY;
            //console.log('Enter');

            await axios
                .get(url, {
                    params: {
                        q: query,
                        units: 'metric',
                        appid: appid,
                    },
                })
                .then((res) => {
                    console.log('res', res);
                    setWeather({data: res.data, loading: false, error: false});
                })
                .catch((error) => {
                    setWeather({...weather, data: {}, error: true});
                    setQuery('');
                    console.log('error', error);
                });
        }
    };

    return (
        <div>
            {
                // show only if data found
                weather['data']['main'] ?
                    <WeatherBackgrounds weatherName={weather['data']['weather']['0']['main']} />:''
            }
            <h1 className="app-name">
                Weather App <span>🌤</span>
            </h1>
            <div className="search-bar">
                <input
                    type="text"
                    className="city-search"
                    placeholder="Search City.."
                    name="query"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyPress={search}
                />
            </div>
            <div className="card mt-1">

                {
                    // show loading
                    weather.loading && (
                        <div className="pt-1">
                            <Loader type="Oval" color="black" height={100} width={100}/>
                        </div>
                    )
                }

                {
                    // show only if data found
                    weather.data.main ?
                        <div>
                            <h1 className="pt-1">{weather['data']['name']}, {weather['data']['sys']['country']}</h1>

                            <div className="date">
                                <span>{toDate()}</span>
                            </div>

                            <div className="icon-temp">
                                <img
                                    className=""
                                    src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                                    alt={weather.data.weather[0].description}
                                />
                                {Math.round(weather.data.main.temp)}
                                <sup className="deg">&deg;C</sup>
                            </div>

                            <div className="des-wind pb-1">
                                <p>{weather.data.weather[0].description.toUpperCase()}</p>
                                <p>Wind Speed: {weather.data.wind.speed}m/s</p>
                            </div>
                        </div>
                    :
                    ''
                }

                {weather.error && !weather.loading ?
                    // city not found
                    <span className="error-message pt-1 pb-1">
                        <span style={{'font-size': '20px'}}> Sorry, City not found</span>
                    </span>
                    :''
                }
            </div>
        </div>
    );
}

export default Weather;
