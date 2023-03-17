import { useState, useEffect } from 'react';
import Search from './components/Search';
import Countries from './components/Countries'

function App() {

  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countries, setCountries] = useState([])

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null)
  }

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
    };

    fetchCountries();
  }, [])

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <div>
        {filteredCountries.length > 10 ? 
          <p>Too many results. Specify your filter, please.</p> : 
          <Countries countries={filteredCountries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />       
        }
      </div>
    </div>
  );
}

export default App;
