import React, { useState, useEffect } from 'react';
import { geoMercator, geoPath } from 'd3';
import { feature } from 'topojson-client';

const width = 600;
const height = 600;

const centerLong = 5.5;
const centerLat = 52.2;

const projection = geoMercator()
  .scale(6000)
  .center([centerLong, centerLat])
  .translate([width / 2, height / 2]);

const pathGenerator = geoPath().projection(projection);

const NetherlandsMap = () => {
  const [geographies, setGeographies] = useState([]);

  useEffect(() => {
    fetch('/nl.json').then((response) => {
      if (response.status !== 200) {
        return;
      }
      response.json().then((nldata) => {
        setGeographies(feature(nldata, nldata.objects.subunits).features);
      });
    });
  }, []);

  return (
    <svg width={width} height={height}>
      <g className="map">
        {geographies.map((d) => (
          <path
            key={`${d.properties.name}`}
            d={pathGenerator(d)}
            className="province"
            fill="000000"
            stroke="#FFFFFF"
            strokeWidth={0.5}
          />
        ))}
      </g>
    </svg>
  );
};

export default NetherlandsMap;
