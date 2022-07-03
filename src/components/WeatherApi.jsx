import axios from 'axios';
import React from 'react';
import{ useState,useEffect } from 'react';
import '../App.css';

const WeatherApi = () => {

    const [ data, setData ] = useState({});
    const [ temp, setTemp ] = useState(0)
    const [ isCelsius, setIsCelsius ] = useState(true)
    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
           setInterval(() => setDateState(new Date()), 30000);
    }, []);

    useEffect(()=>{
        const success = pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a29414f4759c1ef7533f3a60dc26f48e&units=metric`)
                .then(res => {
                    setData(res.data)
                    setTemp(res.data.main.temp)
                });
        }
        navigator.geolocation.getCurrentPosition(success);
    }, []);

    const convertTemp = () => {
        if(isCelsius){
            setTemp((temp * 9 / 5) + 32);
            setIsCelsius(false);  
        } else {
            setTemp((temp - 32) * 5 / 9);
            setIsCelsius(true);
        }
    }

    console.log(data)
    return (
        <div className='weather-card' style={{color: "white"}}>
            <h1>Weather App</h1>
            <h3 style={{color: "black"}}>{data.name}, {data.sys?.country}</h3>
            <div className='new-card'>
            <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="" />
            <br />
            <h3>{temp} {isCelsius ? "°C" : "°F"}</h3>
            <p>"{data.weather?.[0].description}"</p>
            <p><i class="fa-solid fa-wind" style={{color: "black"}}></i><b style={{color: "black"}}> Wind speed: </b>{data.wind?.speed} m/s</p>
            <p><i class="fa-solid fa-cloud" style={{color: "black"}}></i><b style={{color: "black"}}> Clouds: </b>{data.clouds?.all}%</p>
            <p className='ppp' style={{color: "black"}}>
            <i class="fa-solid fa-calendar-days" style={{color: "black"}}></i> 
              {' '}
              {dateState.toLocaleDateString('en-GB', {
                 day: 'numeric',
                 month: 'short',
                 year: 'numeric',
              })}
            </p>
            <p className='ppp' style={{color: "black"}}>
            <i class="fa-solid fa-clock" style={{color: "black"}}></i> 
             {dateState.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })}
            </p>
            <button className="convert-button" onClick={convertTemp}>{isCelsius ? "Convert to °F" : "Convert to °C"}</button>
            </div>
            
        </div>
    );
};

export default WeatherApi;