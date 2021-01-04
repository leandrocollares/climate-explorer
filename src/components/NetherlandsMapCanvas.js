import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { geoMercator, geoPath, select } from 'd3';

const width = 600;
const height = 600;

const centerLong = 5.5;
const centerLat = 52.2;

const projection = geoMercator()
  .scale(6000)
  .center([centerLong, centerLat])
  .translate([width / 2, height / 2]);

const NetherlandsMapCanvas = ({ geographicalData }) => {
  const contextRef = useRef(null);

  const canvasNode = select(contextRef.current).node();
  console.log(canvasNode);

  const context = canvasNode.getContext('2d');
  console.log(context);

  context.strokeStyle = '#ffffff';
  context.lineWidth = 0.3;

  const pathGenerator = geoPath().projection(projection).context(context);

  return (
    <div>
      <canvas width={width} height={height} ref={contextRef}>
        {geographicalData.forEach((d) => {
          context.fillStyle = '#000000';
          context.beginPath();
          pathGenerator(d);
          context.fill();
        })}
      </canvas>
    </div>
  );
};

NetherlandsMapCanvas.propTypes = {
  geographicalData: PropTypes.array,
};

export default NetherlandsMapCanvas;
