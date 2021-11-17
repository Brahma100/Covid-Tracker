import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './Map';
import Table from './Table'
import "leaflet/dist/leaflet.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(13);
  const [markerClicked, setMarkerClicked] = useState(false);

  useEffect(() => {
    fetch("https://randomuser.me/api")
      .then(res => res.json())
      .then((data, err) => {
        if (err) throw err;
        setUserInfo(data.results[0]);
        console.log("Data::", data);
        setMapCenter({ lat: data.results[0].location.coordinates.latitude, lng: data.results[0].location.coordinates.longitude });
        setIsLoading(false);
      }).catch(err =>
        console.log("Error Occured")
      )
  }, []);

  const onMarkerClick = (value) => {
    console.log("Marker Clicked");
    setMarkerClicked(value);
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1>Locator</h1>
      </div>
      <div className="app_content">
        {!isLoading &&
          <>
            {markerClicked && <Table userInfo={userInfo} />}
            <Map onMarkerClick={onMarkerClick} markerClicked={markerClicked} userInfo={userInfo} center={mapCenter} zoom={mapZoom} />
          </>
        }
      </div>
    </div>
  );
}

export default App;
