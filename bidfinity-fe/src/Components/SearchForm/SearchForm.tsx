import userEvent from '@testing-library/user-event';
import React, { useContext, useState } from 'react';
import { AppContext } from '../App/AppContext';

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
  const { projectsData, allProjects, user, setProjectsData, setSearchedLat, setSearchedLon, searchedLat, searchedLon, setFilteredProjects } = useContext(AppContext);
  const [keyword, setKeyword] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [locationPreview, setLocationPreview] = useState<{ display_name: string } | null>(null);
  const [distance, setDistance] = useState<number>(10);
  const [date, setDate] = useState<string>('');

  const [hostedProjects, setHostedProjects] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  async function handleLocation() {
    // setSearchedLat(null)
    // setSearchedLon(null)
    const endpoint = `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`;
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data[0]);
    setSearchedLat(data[0].lat)
    setSearchedLon(data[0].lon)
    setLocationPreview(data[0] || null);

  }

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Wait for location to be discovered
    if (location) {
      await new Promise(() => {
      });
      handleLocation();
    }

    // Make a copy of the projects data
    let filteredProjects: Project[] = [...projectsData];

    // Filter by keyword
    filteredProjects = filteredProjects.filter(project =>
      project.project_title.toLowerCase().includes(keyword.toLowerCase()) ||
      project.project_summary.toLowerCase().includes(keyword.toLowerCase()) ||
      project.location.address.toLowerCase().includes(keyword.toLowerCase())
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
        // const projectDate = new Date(project.created_date);
        const projectDate = new Date(`${project.created_date}T00:00:00.000Z`);

        const searchDate = new Date(date);
        return projectDate >= searchDate;
      });
    }

    if (hostedProjects) {
      filteredProjects = filteredProjects.filter((project) => {
        // Replace the check below with your actual condition for "My Projects"
        return user?.hosted_projects.includes(project.id)
      });
    }

    // Filter by bookmarked
    if (bookmarked) {
      filteredProjects = filteredProjects.filter(project => {
        return user?.bookmarked_projects.includes(project.id)
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

  function clearInputs() {
    setKeyword('');
    setLocation('');
    setLocationPreview(null);
    setDistance(10);
    setDate('');
    setBookmarked(false);
    setHostedProjects(false);
    setProjectsData([...allProjects]); // Add this line
    setSearchedLat(null);
    setSearchedLon(null);
    console.log("LOOK HERE", allProjects)
  }


  // const clearInputs = () => {
  //   
  //   setKeyword('');
  //   setLocation('');
  //   setDistance(10);
  //   setDate('');
  //   setLocationPreview(null);
  //   setFilteredProjects(allProjects);
  //   setAllProjects([...projectsData]);
  //   console.log(allProjects)
  // };

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
      {locationPreview == null && <p>Location not found. Enter the name of a city and click the magnifying class to confirm.</p>}

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

      <div className='margin-above'>
        <label htmlFor="hosted-projects-checkbox">
          <input
            type="checkbox"
            id="hosted-projects-checkbox"
            name="hostedProjects"
            checked={hostedProjects}
            onChange={(event) => setHostedProjects(event.target.checked)}
          />
          My hosted
        </label>
        <label htmlFor="bookmarked-checkbox" style={{ marginLeft: "5px" }}>
          <input
            type="checkbox"
            id="bookmarked-checkbox"
            name="bookmarked"
            checked={bookmarked}
            onChange={(event) => setBookmarked(event.target.checked)}
          />
          Bookmarked
        </label>
      </div>

      <button className="log-in-button margin-above" onClick={() => clearInputs()}>Clear</button>
      <button type="submit" className="log-in-button margin-above" style={{ marginLeft: "5px" }}>Search</button>
    </form>
  );
}

export default SearchForm