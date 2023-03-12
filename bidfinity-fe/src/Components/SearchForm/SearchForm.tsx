import React, { useContext, useState } from 'react';
import { AppContext } from '../App/AppContext';
// import { Project } from '../types';

interface Project {
  id: number;
  project_title: string;
  created_date: string;
  location: { lat: number; lng: number; address: string; };
  project_summary: string;
  status: string;
  contact_information: string;
  upload_id: number;
  lineItems: {
    itemName: string;
    quantity: string;
    description: string;
  }[];
}

const SearchForm: React.FC = () => {
  const { projectsData, setSearchedLat, setSearchedLon, searchedLat, searchedLon, setFilteredProjects } = useContext(AppContext);
  const [keyword, setKeyword] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [locationPreview, setLocationPreview] = useState<{ display_name: string } | null>(null);
  const [distance, setDistance] = useState<number>(10);
  const [date, setDate] = useState<string>('');

  async function handleLocation() {
    setSearchedLat(null)
    setSearchedLon(null)
    const endpoint = `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`;
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data[0]);
    setSearchedLat(data[0].lat)
    setSearchedLon(data[0].lon)
    setLocationPreview(data[0] || null);
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Make a copy of the projects data
    let filteredProjects: Project[] = [...projectsData];

    // Filter by keyword
    filteredProjects = filteredProjects.filter(project =>
      project.project_title.toLowerCase().includes(keyword.toLowerCase()) ||
      project.project_summary.toLowerCase().includes(keyword.toLowerCase())
    );

    // Filter by location
    if (searchedLat && searchedLon) {
      filteredProjects = filteredProjects.filter(project => {
        const projectDistance = getDistance(searchedLat, searchedLon, project.location.lat, project.location.lng);
        return projectDistance <= distance;
      });
    }

    // Filter by date
    if (date) {
      filteredProjects = filteredProjects.filter(project => {
        const projectDate = new Date(project.created_date);
        const searchDate = new Date(date);
        return projectDate >= searchDate;
      });
    }

    // Update the filtered projects state
    setFilteredProjects(filteredProjects);
  }

  // Helper function to calculate the distance between two points
  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 0.621371; // Convert to miles
  }

  // Helper function to convert degrees to radians
  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }

  return (
    <form onSubmit={(event) => handleSearch(event)} className="search-form-container">
      <label htmlFor="keyword-search" className="form-label margin-above">Keyword Search:</label>
      <input
        type="text"
        id="keyword-search"
        name="keyword"
        placeholder="Search by keyword"
        className="form-input"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      <label htmlFor="location-search" className="form-label margin-above" >Location:</label>

      <input
        type="text"
        id="location-search"
        name="location"
        placeholder="Enter a location"
        className="form-input"
        value={location}
        onChange={(event) => {
          setLocation(event.target.value)
        }}

      />
      <button onClick={() => handleLocation()} style={{ background: 'none', border: 'none', outline: 'none', marginTop: "5px" }}>🔍</button>

      {locationPreview && <p>{locationPreview.display_name}</p>}
      {locationPreview == null && <p>Location not found. Try again with a zip code.</p>}

      <label htmlFor="distance-filter" className="form-label margin-above">Within:</label>
      <select
        id="distance-filter"
        name="distance"
        className="form-select"
        value={distance}
        onChange={(event) => setDistance(parseInt(event.target.value))}
      >
        <option value="10">10 miles</option>
        <option value="50">50 miles</option>
        <option value="100">100 miles</option>
        <option value="500">500 miles</option>
      </select>

      <label htmlFor="date-filter" className="form-label margin-above">Date:</label>
      <input
        type="date"
        id="date-filter"
        name="date"
        className="form-input fit-content"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <br></br>
      <button type="submit" className="log-in-button margin-above">Search</button>
    </form>
  );
}

export default SearchForm