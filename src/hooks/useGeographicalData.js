import { useState, useEffect } from 'react';
import { feature } from 'topojson-client';

const useGeographicalData = () => {
  const [geographicalData, setGeographicalData] = useState(null);

  useEffect(() => {
    fetch('/nl.json').then((response) => {
      if (response.status !== 200) {
        return;
      }
      response.json().then((nldata) => {
        setGeographicalData(feature(nldata, nldata.objects.subunits).features);
      });
    });
  }, []);

  return geographicalData;
};

export default useGeographicalData;
