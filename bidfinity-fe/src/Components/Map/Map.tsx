import React, { useEffect, useContext } from 'react';
import { AppContext } from '../App/AppContext';
import L, { LatLngExpression } from 'leaflet';

interface Project {
  id: number;
  project_title: string;
  created_date: string;
  location: string;
  project_summary: string;
  status: string;
  contact_information: string;
  upload_id: number;
}

const Map: React.FC = () => {
  const { projectsData } = useContext(AppContext);

  useEffect(() => {
    // Create a map object with the specified coordinates
    // const map = L.map('map').setView([40.7128, -74.006], 13);
   
  const map = L.map('map').setView([37.0902, -95.7129], 4);

    // Add a tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);

    // Iterate through the data and add a marker for each location
    projectsData.forEach((project: Project) => {
      // Use the zip code as the marker location
      const location = project.location;

      // Convert the zip code to coordinates using the OpenStreetMap Nominatim API
      const getCoordinates = async (zipcode: string): Promise<LatLngExpression> => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${zipcode}`);
        const data = await response.json();
        return [data[0].lat, data[0].lon];
      }
      
      // Create a marker and add it to the map
      getCoordinates(location).then((coordinates: LatLngExpression) => {
        const marker = L.marker(coordinates).addTo(map);

        // Add a popup with a hyperlink to the Wikipedia page for the location
        marker.bindPopup(`<a href="https://en.wikipedia.org/wiki/${location}">Wikipedia page for ${location}</a>`);
      });
    });

    // Clean up when the component unmounts
    return () => {
      map.remove();
    }
  }, [projectsData]);

  return (
    
    <div id="map" style={{ height: '100%', width: '100%' }}></div>

  );
}

export default Map;
