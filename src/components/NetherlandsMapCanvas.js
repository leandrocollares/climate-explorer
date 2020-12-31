import React, { useState, useEffect, useRef } from 'react';
import { geoMercator, geoPath, select } from 'd3';
import { feature } from 'topojson-client';

const width = 600;
const height = 600;

const centerLong = 5.5;
const centerLat = 52.2;

const projection = geoMercator()
  .scale(6000)
  .center([centerLong, centerLat])
  .translate([width / 2, height / 2]);

const NetherlandsMapCanvas = () => {
  const [geographies, setGeographies] = useState([]);

  const contextRef = useRef(null);

  const canvasNode = select(contextRef.current).node();
  console.log(canvasNode);

  const context = canvasNode.getContext('2d');
  console.log(context);

  context.strokeStyle = '#ffffff';
  context.lineWidth = 0.3;

  const pathGenerator = geoPath().projection(projection).context(context);

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
    <div>
      <canvas width={width} height={height} ref={contextRef}>
        {geographies.forEach((d) => {
          context.fillStyle = '#000000';
          context.beginPath();
          pathGenerator(d);
          context.fill();
        })}
      </canvas>
    </div>
  );
};

export default NetherlandsMapCanvas;
