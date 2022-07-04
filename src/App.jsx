import React, { Suspense, lazy} from 'react';
//import WeatherApi from './components/WeatherApi'
const WeatherApi = lazy(()=>import('./components/WeatherApi'));
import './App.css'

function App() {



  return (
    <div className="App">
      <Suspense delayMs={5000} fallback={<h1 className='h1-loading'>Cargando ... </h1>}>
      <WeatherApi />
      </Suspense>
    </div>
  )
}

export default App
