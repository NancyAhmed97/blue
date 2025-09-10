// src/components/LocationMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS
import L from 'leaflet'; // Import Leaflet library itself for custom icon

// Fix for default marker icon not showing in React-Leaflet
// due to Webpack's file loader not finding the default images.
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const LocationMap = ({ latitude, longitude, popupText }) => {
  // Set the initial center of the map to your provided coordinates
  const position = [latitude, longitude];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
      {/* OpenStreetMap Tile Layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marker at the specified location */}
      <Marker position={position}>
        <Popup>
          {popupText || `Latitude: ${latitude}, Longitude: ${longitude}`}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;