import React from 'react';
import{ useState,useEffect } from 'react';
import axios from 'axios';

const usepetition = () => {

    const [ data, setData ] = useState({});
    const [ temp, setTemp ] = useState(0);
    const [ isCelsius, setIsCelsius ] = useState(true);

    useEffect(()=>{
        const success = pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a29414f4759c1ef7533f3a60dc26f48e&units=metric`)
                .then(res => {
                    setData(res.data)
                    setTemp(Math.round(res.data.main.temp))
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

    return {data, temp, isCelsius, convertTemp};
};

export default usepetition;