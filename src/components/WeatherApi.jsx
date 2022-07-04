import axios from 'axios';
import React from 'react';
import{ useState,useEffect } from 'react';
import '../App.css';
import usePetition from '../hook/usePetition';

const WeatherApi = () => {

    const backg = [
        "https://i.gifer.com/Lx0q.gif",
        "https://i.gifer.com/7RtV.gif",
        "https://i.gifer.com/6Bb.gif",
        "https://i.gifer.com/1ez9.gif",
        "https://i.gifer.com/5yp.gif",
        "https://i.gifer.com/7scx.gif",
        "https://i.gifer.com/yY8.gif",
        "https://i.gifer.com/5yb.gif"
    ];

/*     const [ data, setData ] = useState({});
    const [ temp, setTemp ] = useState(0); */
/*     const [ isCelsius, setIsCelsius ] = useState(true); */
    const {data, temp, isCelsius, convertTemp} = usePetition();
    const [background, setBackgorund] = useState();
    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
           setInterval(() => setDateState(new Date()), 30000);
    }, []);

    document.body.style = `background: url(${background})
    no-repeat center center fixed;-webkit-background-size: cover;
    background-size: 100% 100%;`;

    useEffect(() => {
        changeBackground(data.weather?.[0].description);
    }, [data.weather?.[0].description]);

    const changeBackground = () => {
        let description = data.weather?.[0].description;
        if (description === "clear sky") {
            setBackgorund(backg[0]);
        } else if (description === "few clouds") {
            setBackgorund(backg[1]);
        } else if (description === "overcast clouds") {
            setBackgorund(backg[2])
        } else if (description === "broken clouds") {
            setBackgorund(backg[3])
        } else if (description === "mist") {
            setBackgorund[backg[4]]
        } else if (description === "Light rain") {
            setBackgorund(backg[5])
        } else if (description === "scattered clouds") {
            setBackgorund(backg[6])
        } else if (description === "snow") {
            setBackgorund(backg[7])
        } else if (description === "smoke") {
            setBackgorund(backg[4])
        } else if (description === "moderate rain") {
            setBackgorund(backg[5])
        }
    };

/*     useEffect(()=>{
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
    } */

    console.log(data)
    return (
        <div className='weather-card' style={{color: "black"}}>
            <h1>Weather App</h1>
            <h3>{data.name}, {data.sys?.country}</h3>
            <div className='new-card'>
            <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="" />
            <br />
            <h3 className='mod'>{temp} {isCelsius ? "°C" : "°F"}</h3>
            <p className='mod'>"{data.weather?.[0].description}"</p>
            <p className='mod'><i class="fa-solid fa-wind"></i><b> Wind speed: </b>{data.wind?.speed} m/s</p>
            <p className='mod'><i class="fa-solid fa-cloud"></i><b> Clouds: </b>{data.clouds?.all}%</p>
            <p className='ppp mod'>
            <i class="fa-solid fa-calendar-days"></i> 
              {' '}
              {dateState.toLocaleDateString('en-GB', {
                 day: 'numeric',
                 month: 'short',
                 year: 'numeric',
              })}
            </p>
            <p className='ppp mod'>
            <i class="fa-solid fa-clock"></i> 
             {dateState.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })}
            </p>
            <br />
            <button className="convert-button" onClick={convertTemp}>{isCelsius ? "Convert to °F" : "Convert to °C"}</button>
            </div>
            
        </div>
    );
};

export default WeatherApi;