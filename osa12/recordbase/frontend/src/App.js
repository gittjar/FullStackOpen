import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [records, setRecords] = useState([]);

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

  return (
    <div>
      <h1>Records</h1>
      {records.map(record => (
        <div key={record._id}>
          <h2>{record.recordname}</h2>
          <p>{record.artist}</p>
          <p>{record.year}</p>
        </div>
      ))}
    </div>
  );
}

export default App;