import React from 'react';

import { compose, withProps, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker, InfoWindow
} from "react-google-maps";


export const LocationGoogleMaps = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBY_1Ap1PBDBK34rrmhe_A17wyG6WRLOnw",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withStateHandlers(() => ({
      isInfoWindowOpen: true,
    }), {
      onInfoWindowToggle: ({ isInfoWindowOpen }) => () => ({
        isInfoWindowOpen: !isInfoWindowOpen,
      })
    }),
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={13} defaultCenter={{ lat: 40.855, lng: 14.1874 }}>
      <Marker position={{ lat: 40.8396, lng: 14.1874 }} onClick={props.onInfoWindowToggle}/>
      {props.isInfoWindowOpen && 
        <InfoWindow defaultPosition={new window.google.maps.LatLng(40.845, 14.1874)}>
          <div>
            <h6 style={{ fontSize: "1.2rem", fontFamily: "Fira Sans"}}>Getting to know Amazon Web Services</h6>
            <p style={{ fontSize: "1rem", fontFamily: "Fira Sans"}}>
                University of Naples, Federico II<br/>
                Strada Vicinale Cupa Cintia, 21, 80126 Naples, Italy<br/>
                Room H5<br/>
                Monday, June 4th 2018 at 2 PM<br/>
            </p>
          </div>
        </InfoWindow>
      }
    </GoogleMap>
  ));

export default LocationGoogleMaps;