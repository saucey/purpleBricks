import React, { useRef, useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Graphic from '@arcgis/core/Graphic';
import { ButtonSecondary, ButtonCta } from 'wmca-shared-components';
import { plusIcon, minusIcon, liveLocationIcon } from '../utils/index'
import Search from '@arcgis/core/widgets/Search'; // Import Search widget directly
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';

const MapSearch = ({ redirect, coords = null }) => {
  const mapRef = useRef();
  const viewRef = useRef(null);
  const markerRef = useRef(null);
  const addPointMode = useRef(false);
  // const [addPointMode, setAddPointMode] = useState(false);
  const [address, setAddress] = useState(null);
  const [buttonText, setButtonText] = useState('Add point');
  const [getCoords, setCoords] = useState(coords);
  const graphicsLayerRef = useRef(new GraphicsLayer());

  // const getAddress = async (mapPoint) => {
  //   console.log(mapPoint)
  //   try {
  //     const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${mapPoint.latitude}&lon=${mapPoint.longitude}&zoom=18`);
  //     const data = await response.json();
  //     const formattedAddress = data.display_name;
  //     setAddress(formattedAddress);
  //   } catch (error) {
  //     console.error("Error getting address:", error);
  //   }
  // };
  // const graphicsLayer = new GraphicsLayer();


  const addMarker = (point) => {
    const markerSymbol = new PictureMarkerSymbol({
      url: 'data:image/svg+xml;charset=utf-8,<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="25" r="25" fill="%2384329B"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.5248 34.351C20.7186 36.0342 22.1174 38.0064 23.7539 40.3544C24.356 41.2152 25.644 41.2152 26.2461 40.3544C27.8826 38.0064 29.2814 36.0342 30.4752 34.351C35.9752 26.5966 37.125 24.9754 37.125 21C37.125 14.3726 31.6965 9 25 9C18.3035 9 12.875 14.3726 12.875 21C12.875 24.9754 14.0248 26.5966 19.5248 34.351ZM30.125 21C30.125 23.7614 27.8585 26 25.0625 26C22.2665 26 20 23.7614 20 21C20 18.2386 22.2665 16 25.0625 16C27.8585 16 30.125 18.2386 30.125 21Z" fill="white"/></svg>',
      width: 25,
      height: 25,
    });

    const markerGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    });

    // Remove existing marker if present
    graphicsLayerRef.current.removeAll();

    graphicsLayerRef.current.add(markerGraphic);
    // setMarker(markerGraphic);
  };

  const zoomIn = () => {
    viewRef.current.goTo({ zoom: viewRef.current.zoom + 1 });
  };

  const zoomOut = () => {
    viewRef.current.goTo({ zoom: viewRef.current.zoom - 1 });
  };;

  const toggleAddPointMode = () => {
    if (addPointMode.current) {
      // Clear marker and graphics layer when toggling off
      // setMarker(null);
      setCoords(null)
      graphicsLayerRef.current.removeAll();
    }
    const value = addPointMode.current;
    addPointMode.current = !value
    setButtonText(!addPointMode.current ? 'Add Point' : 'Remove Point')
  };


  const setLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const liveLocation = {
          type: "point",
          latitude: latitude,
          longitude: longitude
        };
        viewRef.current.goTo({
          center: [longitude, latitude],
          zoom: 15
        });
        // getAddress(liveLocation);
        setCoords(liveLocation)
        addMarker(liveLocation);
      }, (error) => {
        console.error('Error getting geolocation:', error);
      });
    } else {
      console.error('Geolocation is not supported.');
    }
  };
  
  useEffect(() => { 
    if (coords && coords.longitude) {
      addMarker(coords);
    }
  }, [coords]);
  
  useEffect(() => {

    const map = new Map({
      basemap: 'topo-vector',
      layers: [graphicsLayerRef.current],
    });

    const view = new MapView({
      container: mapRef.current,
      map: map,
      center: [coords?.longitude || -1.9336, coords?.latitude || 52.4828],
      zoom: coords ? 16 : 10,
      ui: {
        components: []
      }
    });
    view.on("click", (event) => {
      const clickedPoint = event.mapPoint;
      if (addPointMode.current) {
        setCoords(clickedPoint)
        addMarker(clickedPoint);
      }
    });

    viewRef.current = view;

    // Initialize the search widget
    const searchWidget = new Search({
      view: viewRef.current,
      container: 'searchDiv',
      viewModel: {
        source: []
      }
    });

    // Event listeners for search widget
    searchWidget.on("search-clear", (event) => {
      // viewRef.current.graphics.remove(markerRef.current);
      graphicsLayerRef.current.removeAll();
      markerRef.current = null;
      setAddress(null);
      setCoords(null)
      const submitButton = document.querySelector('.esri-search__submit-button');
      if (submitButton) {
        submitButton.style.display = 'block';
      }
    });

    searchWidget.on('select-result', (event) => {

      const selectedLocation = event.result.feature.geometry;
      viewRef.current.goTo({
        center: [selectedLocation.longitude, selectedLocation.latitude],
        zoom: 17
      });

      const liveLocation = {
        type: "point",
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude
      };

      addMarker(liveLocation);
      setCoords(liveLocation)

      const submitButton = document.querySelector('.esri-search__submit-button');
      if (submitButton) {
        submitButton.style.display = 'none';
      }

      // viewRef.current.popup.open({
      //   location: selectedLocation,
      //   title: 'Selected Location',
      //   content: `<p>${event.result.name}</p>`
      // });

    });

    // Add the search widget to the UI
    if (viewRef.current) {
      viewRef.current.ui.add(searchWidget, {
      });
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.container = null;
      }
      if (searchWidget) {
        searchWidget.destroy();
      }
    };
  }, [coords]);

  useEffect(() => {

  })

  useEffect(() => {
    const waitForEsriSearchButton = setInterval(() => {
      
      // Target the esri-widget--button
      const esriSearchButton = document.querySelector('.esri-search__submit-button');

      if (esriSearchButton) {

        const esriInput = document.querySelector('.esri-search__input');
        esriInput.focus()
        esriInput.value = address
        clearInterval(waitForEsriSearchButton); // Stop checking once the button is found

        // Add wmnds-search-bar__btn class
        esriSearchButton.classList.add('wmnds-search-bar__btn');

        // Clear any existing content in the button
        esriSearchButton.innerHTML = '';

        // Create and append the SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
        title.textContent = 'Search';

        const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        use.setAttribute('xlink:href', '#wmnds-general-search');
        use.setAttribute('href', '#wmnds-general-search');

        svg.appendChild(title);
        svg.appendChild(use);
        esriSearchButton.appendChild(svg);

      }

    }, 100); // Check every 100 milliseconds

    // Cleanup: Stop checking when the component unmounts
    return () => clearInterval(waitForEsriSearchButton);
  }, [address]);


  return (
    <div>
      <ul className="wmnds-m-b-lg">
        <li>Find a place by searching for a place or postcode, or using your location.</li>
        <li>Click on the <strong>Add point</strong> button. Click on the map where you want the point to appear. You can edit the point by clicking on it and dragging. </li>
      </ul>
      <label className="wmnds-fe-label" for="selectedState">Place or postcode</label>

      <div id="searchBar_form" className="wmnds-search-bar wmnds-m-b-lg">
        <input id="searchBar_input" aria-label="Search" type="text" className="wmnds-search-bar__input wmnds-fe-input" placeholder="Search for tickets, timetables, travel advice…" />
        <button className="wmnds-search-bar__btn" id="wmnds-search">
          <svg>
            <title>Search</title>
            <use xlinkHref="#wmnds-general-search" href="#wmnds-general-search"></use>
          </svg>
        </button>
      </div>

      <div className="map-container wmnds-m-b-lg" style={{ width: '100%', height: '600px', position: 'relative' }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
        <div className="zoom-controls" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1000' }}>
          <button className="zoom-button" onClick={zoomIn}>
            {plusIcon()}
          </button>
          <button className="zoom-button" onClick={zoomOut}>
            {minusIcon()}
          </button>
          <button className="zoom-button" onClick={setLiveLocation}>
            {liveLocationIcon()}
          </button>
        </div>
      </div>
      <div id="searchDiv" value={address}></div>

      <ButtonSecondary className={'wmnds-m-r-md'} label={buttonText} onClick={toggleAddPointMode} />
      <ButtonCta label="Continue" onClick={(e) => redirect(e, getCoords)} />

    </div>
  );
};

export default MapSearch;
