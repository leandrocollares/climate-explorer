import React from 'react';
import './App.css';
import useGeographicalData from './hooks/useGeographicalData';
import NetherlandsMap from './components/NetherlandsMap';

const App = () => {
  const geographicalData = useGeographicalData();

  if (!geographicalData) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="app">
      <NetherlandsMap geographicalData={geographicalData} />
    </div>
  );
};

export default App;
