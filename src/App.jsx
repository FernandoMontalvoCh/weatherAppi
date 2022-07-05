import React from 'react';
import usepetition from './hook/usepetition.jsx';
import './App.css'
import WeatherApi from './components/WeatherApi.jsx';


function App() {

  const { isLoading } = usepetition();


  return (
    <div className="App">
      { isLoading ? 
          <>            
          <div className="spinner">
          <span>Loading...</span>
          <div className="half-spinner"></div>
          </div>
          </>:
          <>
          <WeatherApi />
          </>}
    </div>
  )
}

export default App
