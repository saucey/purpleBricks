import React, { useRef, useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';

const MapReview = ({ lat, long }) => {
  const mapRef = useRef();

  useEffect(() => {
    const graphicsLayer = new GraphicsLayer();

    const map = new Map({
      basemap: 'topo-vector',
      layers: [graphicsLayer],
    });

    // eslint-disable-next-line no-unused-vars
    const view = new MapView({
      container: mapRef.current,
      map: map,
      center: [long, lat], // Check if lat and long are correctly passed
      zoom: 10,
      ui: {
        components: []
      }
    });

    const point = {
      type: 'point',
      longitude: long,
      latitude: lat,
    };

    const markerSymbol = new PictureMarkerSymbol({
      url: 'data:image/svg+xml;charset=utf-8,<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="25" r="25" fill="%2384329B"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.5248 34.351C20.7186 36.0342 22.1174 38.0064 23.7539 40.3544C24.356 41.2152 25.644 41.2152 26.2461 40.3544C27.8826 38.0064 29.2814 36.0342 30.4752 34.351C35.9752 26.5966 37.125 24.9754 37.125 21C37.125 14.3726 31.6965 9 25 9C18.3035 9 12.875 14.3726 12.875 21C12.875 24.9754 14.0248 26.5966 19.5248 34.351ZM30.125 21C30.125 23.7614 27.8585 26 25.0625 26C22.2665 26 20 23.7614 20 21C20 18.2386 22.2665 16 25.0625 16C27.8585 16 30.125 18.2386 30.125 21Z" fill="white"/></svg>',
      width: 25,
      height: 25,
    });

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
    });
    graphicsLayer.add(pointGraphic);

  }, [lat, long]);

  return (
    <div className="map-wrapper">
      <div ref={mapRef} style={{ width: '100%', height: '100%', position: 'relative' }} />
    </div>
  );
};

export default MapReview;
