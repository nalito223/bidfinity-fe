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


// interface Location {
//   lat: string;
//   lng: string;
// }

// const parseLocation = (location: { lat: string; lng: string }): Location => {
//   return location;
// };


// const getDistanceInMiles = (location1: { lat: string; lng: string }, location2: { lat: string; lng: string }): number => {
//   const lat1 = location1.lat;
//   const lat2 = location2.lat;
//   const lon1 = location1.lng;
//   const lon2 = location2.lng;
//   const R: number = 3958.8; // Earth's radius in miles
//   const phi1: number = (lat1 * Math.PI) / 180; // Convert lat1 to radians
//   const phi2: number = (lat2 * Math.PI) / 180; // Convert lat2 to radians
//   const deltaPhi: number = ((lat2 - lat1) * Math.PI) / 180; // Convert deltaLat to radians
//   const deltaLambda: number = ((lon2 - lon1) * Math.PI) / 180; // Convert deltaLon to radians
//   const a: number = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
//     Math.cos(phi1) * Math.cos(phi2) *
//     Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
//   const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance: number = R * c;
//   return distance;
// };

const filterProjects = (projectsData: Project[], keyword: string, location: { lat: string; lng: string }, distance: number, date: string, lat: number, lon: number): Project[] => {
  const filteredProjects = projectsData.filter((project) => {
    const titleContainsKeyword = project.project_title.toLowerCase().includes(keyword.toLowerCase());
    const summaryContainsKeyword = project.project_summary.toLowerCase().includes(keyword.toLowerCase());
    const projectLocation = project.location;
    // const isWithinDistance = location ? getDistanceInMiles({ lat, lng }, projectLocation) <= distance : true;
    // const createdOnDate = project.created_date === date;
    // return titleContainsKeyword || summaryContainsKeyword || (location && isWithinDistance) || (date && createdOnDate);
  });
  return filteredProjects;
};


const SearchForm: React.FC = () => {
  const { projectsData } = useContext(AppContext);
  const [keyword, setKeyword] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [locationPreview, setLocationPreview] = useState<string>('');
  const [distance, setDistance] = useState<number>(10);
  const [date, setDate] = useState<string>('');


  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Use the Nominatim API to get the latitude and longitude for the input location
    const locationResponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json`);
    const [firstResult] = await locationResponse.json();

    if (!firstResult) {
      // Handle the case where no location results were found
      console.log('No location results found');
      return;
    }

    const { lat, lon } = firstResult;

    // const filteredProjects = filterProjects(projectsData, keyword, distance, date, lat, lon);
    // console.log(filteredProjects);
  };

  async function handleLocation(event: React.ChangeEvent<HTMLInputElement>) {
    // const endpoint = `https://nominatim.openstreetmap.org/search?q=${event.target.value}&format=json&limit=1`;
    // const response = await fetch(endpoint);
    // const data = await response.json();
    // console.log(data)
    // setLocationPreview(data.address.city)
  }

  return (
    // <div className="search-container">
      <form onSubmit={handleSearch} className="search-form-container">
        {/* <div className="form-field"> */}
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
        {/* </div> */}
        {/* <div className="search-field"> */}
          <label htmlFor="location-search" className="form-label margin-above" >Location:</label>
          <input
            type="text"
            id="location-search"
            name="location"
            placeholder="Enter a location"
            className="form-input"
            value={location}
            onChange={(event) => {
              handleLocation(event)
              setLocation(event.target.value)
            }}
          />
          <p>{locationPreview}</p>
        {/* </div> */}
        {/* <div className="search-field"> */}
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
        {/* </div> */}
        {/* <div className="search-field"> */}
          <label htmlFor="date-filter" className="form-label margin-above">Date:</label>
          <input
            type="date"
            id="date-filter"
            name="date"
            className="form-input fit-content"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        {/* </div> */}
        <br></br>
        <button type="submit" className="log-in-button margin-above">Search</button>
      </form>
    // </div>
  );

}

export default SearchForm


