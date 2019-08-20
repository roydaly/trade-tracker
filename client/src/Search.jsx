// This is where the search page will go. 

import React, { useState, useEffect } from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios';

export default function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.API_KEY}`)
        .then(res => {
            let data = res.data.bestMatches
            setData(data)
            console.log(data[0]["6. marketClose"])
        })
    }
       
  return (
      <>
        <div className='search'>
            <h1>Search for a Company below:</h1>
        </div>
        <div className='search-page'>
    <form>
        <input
          type="text"
          name="query"
          placeholder="Enter company name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
        <div>
            {data.map((data, index) => (
            <div key={index}>{data['2. name']}</div>
            ))}
        </div>
    </>
  );
}

