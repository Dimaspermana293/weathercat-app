import { useState } from 'react';
import './App.css';
import {FaHeart} from 'react-icons/fa';
const api ={
  key: "cf2ca99e5dcdaa85b63f5ee75315c6e1",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  // get api weather
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(weather);
        });
    }
  }
  // fungsi date
  const dateBuilder = (d) =>{
    let months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    let days = ["Senin", "Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month =months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day}, ${date} ${month} ${year}`
  }
  return (
    <div className={typeof weather.main != "undefined" ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <body>
      <main>
        <div className='heading'>
          <p>WeatherCat</p>
        </div>
        <div className='search-box'>
          <input
          type="text"
          className='search-bar'
          placeholder='Search...'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ?(
          <div>
          <div className='location-box'>
          <div className='location'>{weather.name}, {weather.sys.country}</div>
          <div className='date'>{dateBuilder(new Date())}</div>
        </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.main.temp)} &#8451;
            </div>
            <div className='weather'>{weather.weather[0].main}</div>
            <hr/>
          </div>
          </div>
      ) : ('')}
      </main>
      <footer>
        <p>Make with <FaHeart style={{color: 'red'}}/> by <a href='https://github.com/Dimaspermana293'>Dimas Permana</a> </p>
      </footer>
      </body>
    </div>
  );
}

export default App;
