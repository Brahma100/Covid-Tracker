import React from "react";
import { Popup, Marker } from 'react-leaflet';
import L from 'leaflet';

const ShowDataOnMap = ({userInfo, onMarkerClick}) => {

    return (
        <>{userInfo &&

            <Marker
                onClick={()=>onMarkerClick(true)}
                icon={new L.Icon({
                    iconUrl: userInfo.picture.thumbnail,
                    iconRetinaUrl: userInfo.picture.thumbnail,
                    shadowUrl: null,
                    shadowSize: null,
                    shadowAnchor: null,
                    iconSize: new L.Point(30, 30),
                    className: 'leaflet-div-icon',
                    iconAnchor: new L.Point(0, 0),

                })}

                position={[userInfo.location.coordinates.latitude, userInfo.location.coordinates.longitude]}
            >

                <Popup>
                    <div className="info-container">
                        <div className="info-profile" style={{ backgroundImage: `url(${userInfo.picture.thumbnail})` }} />
                        <div className="info-name">{userInfo.name.title + " " + userInfo.name.first + " " + userInfo.name.last}</div>
                        <div className="info-data">Email: {userInfo.email}</div>
                        <div className="info-data">Country: {userInfo.location.country + ", " + userInfo.location.state}</div>
                        <div className="info-data">Age: {userInfo.dob.age}</div>
                    </div>
                </Popup>
            </Marker>

        }</>
    )

}
export default ShowDataOnMap;
