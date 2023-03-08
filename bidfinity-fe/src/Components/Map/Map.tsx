import React, { useContext, useEffect } from 'react';
import L from 'leaflet';
import { LatLngExpression } from 'leaflet';
import { AppContext } from '../App/AppContext';

interface Project {
  id: number;
  project_title: string;
  created_date: string;
  location: { lat: number; lng: number };
  project_summary: string;
  status: string;
  contact_information: string;
  upload_id: number;
}


const Map: React.FC = () => {
  const { projectsData } = useContext(AppContext);

  useEffect(() => {
    const map = L.map('map').setView([37.0902, -95.7129], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    projectsData.forEach((project: Project, index: number, array: Project[]) => {
      const { lat, lng } = project.location;
    
      const getCoordinates = async (lat: number, lng: number): Promise<LatLngExpression> => {
        // const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        // @ts-ignore
        const data = await response.json();
        console.log("Data map", data)
        return [data.lat, data.lon];
      };
    
      getCoordinates(lat, lng).then((coordinates: LatLngExpression) => {
        const marker = L.marker(coordinates).addTo(map);
        marker.bindPopup(`<p>${project.project_title}</p>`);
    
        // marker.bindPopup(`<a href="https://en.wikipedia.org/wiki/${project.location}">Wikipedia page for ${project.location}</a>`);
      });
    });

    return () => {
      map.remove();
    };
  }, [projectsData]);

  return <div id="map" style={{ height: '100%', width: '100%' }}></div>;
};

export default Map;
