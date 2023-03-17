import React from 'react'
import CountryInfo from './CountryInfo'
import CountryLine from './CountryLine'

const Countries = ({countries, selectedCountry, setSelectedCountry}) => {
  return (
    <div>
      {countries.length === 1 ?
        countries.map(country => {
          return (
            <CountryInfo key={country.name.official} country={country} />
          )
        }) : 
        selectedCountry ? 
          <CountryInfo country={selectedCountry}/> :
        countries.map(country => {
          return (
            <CountryLine key={country.name.official} country={country} setSelectedCountry={setSelectedCountry} />
          )
        })
      }
    </div>
  )
}

export default Countries