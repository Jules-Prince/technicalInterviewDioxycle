import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
  const [co, setCO] = useState(0); // Default value for CO
  const [h2, setH2] = useState(0); // Default value for H2

  useEffect(() => {
    const sendData = async () => {
      try {
        await axios.post('http://127.0.0.1:3000/api/molar_fractions', { CO: co, H2: h2 });
        console.log('Molar fractions transmitted successfully');
      } catch (error) {
        console.error('Error updating molar fractions:', error);
      }
    };

    // Send data whenever either CO or H2 changes
    sendData();
  }, [co, h2]);

  const handleCOChange = (e) => {
    setCO(parseFloat(e.target.value));
  };

  const handleH2Change = (e) => {
    setH2(parseFloat(e.target.value));
  };

  return (
    <div className="container">
      <form>
        <label htmlFor="co">CO Molar Fraction</label>
        <input
          type="range"
          id="co"
          min="0"
          max="1"
          step="0.01"
          value={co}
          onChange={handleCOChange}
          required
        />
        <span>{co.toFixed(2)}</span>
        <label htmlFor="h2">H2 Molar Fraction</label>
        <input
          type="range"
          id="h2"
          min="0"
          max="1"
          step="0.01"
          value={h2}
          onChange={handleH2Change}
          required
        />
        <span>{h2.toFixed(2)}</span>
      </form>
    </div>
  );
};

export default Form;
