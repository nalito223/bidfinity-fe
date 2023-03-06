import React, { useContext, useState } from 'react';
import { AppContext } from '../App/AppContext';

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

const SearchForm: React.FC = () => {
  const { projectsData } = useContext(AppContext);
  const [keyword, setKeyword] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [distance, setDistance] = useState<number>(10);
  const [date, setDate] = useState<string>('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Filter the projects data based on the search parameters
    const filteredProjects = projectsData.filter((project) => {
      // Check if the project title or summary contain the keyword
      const titleContainsKeyword = project.project_title.toLowerCase().includes(keyword.toLowerCase());
      const summaryContainsKeyword = project.project_summary.toLowerCase().includes(keyword.toLowerCase());
      // Check if the project location is within the specified distance
      const distanceInMiles = getDistanceInMiles(project.location, location);
      const isWithinDistance = distanceInMiles <= distance;
      // Check if the project was created on the specified date
      const createdOnDate = project.created_date === date;
      // Return true if the project meets all search criteria
      return titleContainsKeyword || summaryContainsKeyword || (location && isWithinDistance) || (date && createdOnDate);
    });
    console.log(filteredProjects);
  };

  const getDistanceInMiles = (location1: string, location2: string): number => {
    // This is a placeholder function that returns a random distance between 1 and 500 miles
    return Math.floor(Math.random() * 500) + 1;
  };

  return (
    <div className="search-container">
    <form>
      <div className="form-field">
        <label htmlFor="keyword-search" className="form-label margin-above">Keyword Search:</label>
        <input type="text" id="keyword-search" name="keyword" placeholder="Search by keyword" className="form-input" />
      </div>
      <div className="search-field">
        <label htmlFor="location-search" className="form-label margin-above" >Location:</label>
        <input type="text" id="location-search" name="location" placeholder="Enter a location" className="form-input" />
      </div>
      <div className="search-field">
        <label htmlFor="distance-filter" className="form-label margin-above" >Within:</label>
        <select id="distance-filter" name="distance" className="form-select">
          <option value="10" selected>10 miles</option>
          <option value="50">50 miles</option>
          <option value="100">100 miles</option>
          <option value="500">500 miles</option>
        </select>
      </div>
      <div className="search-field">
        <label htmlFor="date-filter" className="form-label margin-above">Date:</label>
        <input type="date" id="date-filter" name="date" className="form-input" />
      </div>
      <button type="submit" className="log-in-button margin-above">Search</button>
    </form>
  </div>
  )
}

export default SearchForm
