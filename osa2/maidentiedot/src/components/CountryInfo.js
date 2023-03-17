import React, {useEffect, useState} from 'react'

const CountryInfo = ({country}) => {

  const api_key = process.env.REACT_APP_API_KEY
  const latitude = country.capitalInfo.latlng[0]
  const longitude = country.capitalInfo.latlng[1]
  const [weather, setWeather]= useState({})
  const [weatherReady, setWeatherReady] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`
      );
      const data = await response.json();
      setWeather(data)
      setWeatherReady(true)
    }

    fetchWeather();
  }, [])
  
  return (
    <div>
      {weatherReady ? 
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <b>languages</b>
        <ul>
          {Object.values(country.languages).map((language, index) => {
            return <li key={index}>{language}</li>
          })}                
        </ul>  
        <img alt={`flag of ${country.name.common}`} src={country.flags.png} /> 
        <h2>Weather in {`${country.capital[0]}`}</h2>
        <p>temperature {weather.main.temp} Celsius</p>
        <img alt='weather icon' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <p>wind {weather.wind.speed} m/s</p>
      </div> :
        <p>Loading...</p>
      }
      
    </div>             
  )
}

export default CountryInfo