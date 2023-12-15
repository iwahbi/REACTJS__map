import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../style/styles.css';

const MapView = ({ friendsPositions, currentUserPosition }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map
      mapRef.current = L.map('map-container').setView(
        [currentUserPosition.latitude, currentUserPosition.longitude],
        13
      );

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
    }

    // Update friend positions on the map
    friendsPositions.forEach((friend) => {
      L.marker([friend.position.latitude, friend.position.longitude])
        .addTo(mapRef.current)
        .bindPopup(friend.username);
    });

    // Update the current user's position
    L.marker([currentUserPosition.latitude, currentUserPosition.longitude])
      .addTo(mapRef.current)
      .bindPopup('You are here!');
  }, [friendsPositions, currentUserPosition]);

  return <div id="map-container" className="map-container"></div>;
};

export default MapView;
