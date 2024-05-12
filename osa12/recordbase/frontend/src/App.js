import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function App() {
  const [records, setRecords] = useState([]);
  const [recordname, setRecordname] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8080/records');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };
  
    fetchRecords();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const record = {
      recordname,
      artist,
      year: Number(year)
    };

    try {
      const response = await axios.post('http://localhost:8080/records', record);
      setRecords([...records, response.data]);
      setRecordname('');
      setArtist('');
      setYear('');
    } catch (error) {
      console.error('Error posting record:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/records/${id}`);
      setRecords(records.filter(record => record._id !== id));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div>
      <h1>Jarnos Record App</h1>
      <h5>Backend: Node.js, Express, MongoDB</h5>
      <h5>Frontend: React</h5>
      <h5>Docker</h5>
      <h2>Lisää levy</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={recordname} onChange={e => setRecordname(e.target.value)} placeholder="Levyn nimi" required />
        <br></br>
        <input type="text" value={artist} onChange={e => setArtist(e.target.value)} placeholder="Artisti" required />
        <br></br>
        <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="Julkaisuvuosi" required />
        <br></br>
        <button type="submit">Lisää +</button>
      </form>

      <div className="record-container">
      {records.map(record => (
        <div key={record._id} className='record-card'>
          <h4>{record.recordname}</h4>
          <hr></hr>
          <p>{record.artist}</p>
          <p>{record.year}</p>
          <button onClick={() => handleDelete(record._id)}>Poista</button>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;