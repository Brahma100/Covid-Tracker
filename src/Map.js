import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import "./Map.css";
import ShowDataOnMap from './util.js';

function Map({ userInfo, center, zoom, onMarkerClick, markerClicked }) {
    console.log("Map", userInfo);
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom} onMarkerClick={()=>onMarkerClick()} markerClicked={markerClicked}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <ShowDataOnMap userInfo={userInfo} onMarkerClick={onMarkerClick}/>
            </LeafletMap>

        </div>
    )
}

export default Map;
