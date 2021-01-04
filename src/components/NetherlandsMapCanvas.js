import React, { useEffect, useRef } from 'react';
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
  const contextRef = useRef();

  useEffect(() => {
    const canvasNode = select(contextRef.current).node();

    const context = canvasNode.getContext('2d');

    context.strokeStyle = '#c5c5c5';
    context.lineWidth = 0.5;
    context.fillStyle = '#e5f5f9';

    const pathGenerator = geoPath().projection(projection).context(context);

    geographicalData.forEach((d) => {
      context.beginPath();
      pathGenerator(d);
      context.fill();
      context.stroke();
    });
  }, [contextRef, projection]);

  return (
    <div>
      <canvas width={width} height={height} ref={contextRef} />
    </div>
  );
};

NetherlandsMapCanvas.propTypes = {
  geographicalData: PropTypes.array,
};

export default NetherlandsMapCanvas;
