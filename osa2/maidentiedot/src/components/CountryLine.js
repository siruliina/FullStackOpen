import React from 'react'

const CountryLine = ({country, setSelectedCountry}) => {

  const handleClick = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <p>{country.name.common}</p>
      <button onClick={() => handleClick(country)}>show</button>
    </div>
  )
}

export default CountryLine