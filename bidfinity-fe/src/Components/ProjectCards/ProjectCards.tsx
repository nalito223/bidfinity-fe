import React, { useContext } from "react";
import { AppContext } from '../App/AppContext';
import "./ProjectCards.css"
// @ts-ignore
import edit from "../../images/edit.png"

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


const ProjectCards = () => {
  const { projectsData, user, openModal, setSelectedProject } = useContext(AppContext);
  const sortedProjectsData = projectsData.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());

  return (
    <div>
      {sortedProjectsData.map((project: Project) => (
        <div key={project.id} className="card">

          <div className="card-left">
            <h3>{project.project_title} </h3>
            <p>{project.project_summary}</p>
            <p>{project.location + " | " + project.created_date} </p>
            <p><mark style={{ backgroundColor: project.status === "closed" ? "RGB(204, 204, 204, 0.5)" : "rgb(30, 164, 116, 0.2)" }}>{project.status}</mark></p>
          </div>

          <div className="card-right">
            {user?.hosted_projects.includes(project.id)
              ?
              <img
                src={edit}
                alt="Edit icon"
                className="edit-icon"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedProject(project)
                  openModal("edit project");
                }}
              />
              :
              <button className="sign-up-button">View detail</button>
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCards;




// import React, { useState, useEffect, useMemo } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import { LatLngExpression } from "leaflet";
// import axios from "axios";

// interface Project {
//   id: number;
//   project_title: string;
//   created_date: string;
//   location: { lat: number; lng: number };
//   project_summary: string;
//   status: string;
//   contact_information: string;
//   upload_id: number;
// }

// const ProjectCards: React.FC = () => {
//   const [projectsData, setProjectsData] = useState<Project[]>([]);

//   const getLocation = useMemo(() => {
//     const cachedLocations = new Map();

//     return async function getLocation(lat: number, lng: number) {
//       const cacheKey = `${lat},${lng}`;

//       if (cachedLocations.has(cacheKey)) {
//         return cachedLocations.get(cacheKey);
//       }

//       const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
//       const response = await axios.get(url);
//       const { city, state } = response.data.address;
//       const location = { city, state };
//       cachedLocations.set(cacheKey, location);
//       return location;
//     };
//   }, []);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       const response = await axios.get("/api/projects");
//       setProjectsData(response.data);
//     };

//     fetchProjects();
//   }, []);

//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);

//   return (
//     <div>
//       <h1>Projects</h1>
//       <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: "400px", width: "800px" }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         {projectsData.map((project: Project) => {
//           const { lat, lng } = project.location;

//           return (
//             <Marker key={project.id} position={[lat, lng]} onClick={() => setSelectedProject(project)}>
//               <Popup>
//                 <div>
//                   <h2>{project.project_title}</h2>
//                   <p>{project.project_summary}</p>
//                   <p>Status: {project.status}</p>
//                 </div>
//               </Popup>
//             </Marker>
//           );
//         })}
//         {selectedProject && (
//           <Popup position={[selectedProject.location.lat, selectedProject.location.lng]}>
//             <div>
//               <h2>{selectedProject.project_title}</h2>
//               <p>{selectedProject.project_summary}</p>
//               <p>Status: {selectedProject.status}</p>
//             </div>
//           </Popup>
//         )}
//       </MapContainer>
//       <div>
//         <h2>Projects List</h2>
//         {projectsData.map((project: Project) => {
//           const [city, state] = getLocation(project.location.lat, project.location.lng);

//           return (
//             <div key={project.id}>
//               <h3>{project.project_title}</h3>
//               <p>
//                 {city}, {state}
//               </p>
//               <p>{project.project_summary}</p>
//               <button onClick={() => setSelectedProject(project)}>View on Map</button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ProjectCards;
