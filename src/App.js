import React from 'react';
import MovieSearch from "./Components/FetchingData.jsx";
import {BrowserRouter,Route,Routes} from 'react-router-dom'; 
import MovieDetails from "./Components/Details/index.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
     <Route path="/" element={<MovieSearch/>}/>
     <Route path="/movie/:id" element={<MovieDetails/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
