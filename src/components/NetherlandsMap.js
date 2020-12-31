import React from 'react';
import PropTypes from 'prop-types';
import { geoMercator, geoPath } from 'd3';

const width = 600;
const height = 600;

const centerLong = 5.5;
const centerLat = 52.2;

const projection = geoMercator()
  .scale(6000)
  .center([centerLong, centerLat])
  .translate([width / 2, height / 2]);

const pathGenerator = geoPath().projection(projection);

const NetherlandsMap = ({ geographicalData }) => {
  return (
    <svg width={width} height={height}>
      <g className="map">
        {geographicalData.map((d) => (
          <path
            key={`${d.properties.name}`}
            d={pathGenerator(d)}
            className="province"
            fill="#e5f5f9"
            stroke="#c5c5c5"
            strokeWidth={0.5}
          />
        ))}
      </g>
    </svg>
  );
};

NetherlandsMap.propTypes = {
  geographicalData: PropTypes.array,
};

export default NetherlandsMap;
