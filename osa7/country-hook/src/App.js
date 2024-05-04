import React, { useState } from 'react';
import { useCountry, useField } from './hooks'; // käytetään omia hookseja
import './styles.css';


const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return (
      <div>
        not found today ... !
      </div>
    );
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <div>region {country.data.region}</div>
      <hr/>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
     
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
            <h2>Jarnos Country App </h2>
            <p>Harjoitus 7.7: country hook</p>

      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
     
    </div>
  );
};

export default App;