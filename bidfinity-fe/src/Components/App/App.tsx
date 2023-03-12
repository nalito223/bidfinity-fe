import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import React, { useState, useCallback, useEffect } from "react";
import { AppContext } from "./AppContext";
import './App.css'
import Nav from '../Nav/Nav'
import LandingPage from "../LandingPage/LandingPage"
import Footer from "../Footer/Footer"
import Modal from "../Modal/Modal"
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm"
import LogInForm from "../LogInForm/LogInForm"
import Buyer from "../Buyer/Buyer"
import Supplier from "../Supplier/Supplier"
import EditProject from "../EditProject/EditProject";
import ProjectDetail from "../ProjectDetail/ProjectDetail";
import EditProfile from "../EditProfile/EditProfile";
import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";
// import Map from "../Map/Map"
const { accountsData, uploadsData, projects } = require('../fakeData/data');


type Account = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  account_type: string;
  hosted_projects: number[];
  bookmarked_projects: number[];
  country: string;
  business_name?: string;
  image?: string;
};

interface Upload {
  id: number;
  filename: string;
  filesize: number;
  mimetype: string;
  s3_object_key: string;
  uploaded_at: string;
}

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

const App: React.FC = () => {
  const [user, setUser] = useState<Account | null>(accountsData[1]);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchedLat, setSearchedLat] = useState<number>(0);
  const [searchedLon, setSearchedLon] = useState<number>(0);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (filteredProjects.length > 0) {
      setProjectsData(filteredProjects);
    } else {
      setProjectsData(projects);
    }
  }, [projects, searchedLat, searchedLon, filteredProjects]);

  const handleLogin = (matchingAccount: Account) => {
    setUser(matchingAccount);
    navigate(`/user/${matchingAccount.id}`);
    console.log("made it to handlelogin", user)
  };


  const handleLogout = () => {
    setUser(null)
    navigate(`/`);
  }

  const handleCreateAccount = (email: string, password: string, userType: string) => {
    const newUser: Account = {
      id: Date.now(),
      first_name: 'Jane',
      last_name: 'Doe',
      email: email,
      password: password,
      phone_number: '555-555-5556',
      account_type: userType,
      hosted_projects: [],
      bookmarked_projects: [],
      country: 'USA',
      business_name: "",
      image: 'https://cdn-icons-png.flaticon.com/512/666/666201.png'
    }

    accountsData.push(newUser)
    setUser(newUser);
    navigate(`/user/${newUser.id}`);
    console.log(`New Account: ${email}`, accountsData)
  }


  const openModal = useCallback((selectedForm: string) => {
    if (selectedForm === "signup") {
      setModal("signup")
    } else if (selectedForm === "login") {
      setModal("login")
    } else if (selectedForm === "project detail") {
      setModal("project detail")
    } else if (selectedForm === "edit project") {
      setModal("edit project")
    } else if (selectedForm === "edit profile") {
      setModal('edit profile')
    } else if (selectedForm === "create project") {
      setModal('create project')
    }

    setShowModal(true);

  }, []);

  const closeModal = () => {
    setShowModal(false);
    setModal("")
    setSelectedProject(null)
  };

  const handleOpenModal = () => {
    openModal("signup");
  }



  return (
    <AppContext.Provider
      value={{
        user,
        // currentUser: user,
        // setCurrentUser: setUser,
        handleLogin,
        handleLogout,
        openModal,
        closeModal,
        handleOpenModal,
        handleCreateAccount,
        setSelectedProject,
        setSearchedLat,
        setSearchedLon,
        setFilteredProjects,
        searchedLat,
        searchedLon,
        accountsData,
        projectsData,
        selectedProject,
      }}>
      <main className="App">
        <Nav />
        <Routes>
          <Route path="/"
            element={
              <>
                <LandingPage />
                {showModal && (
                  <Modal>
                    {modal === "signup" && <CreateAccountForm />}
                    {modal === "login" && <LogInForm />}
                  </Modal>
                )}
                <Footer />
              </>
            }
          />

          {/* <Route path="/user/:id"
            element={
              user && user.account_type === "buyer" ? <Buyer /> : null
            }
          /> */}

          {/* 
          <Route path="/user/:id"
            element={
              user && user.account_type === "supplier" ? <Supplier /> : null
            }
          /> */}

          <Route
            path={`/user/${user?.id}`}
            element={
              <>
                <Buyer />
                {showModal && (
                  <Modal>
                    {selectedProject && modal === "edit project" && <EditProject />}
                    {selectedProject && modal === "project detail" && <ProjectDetail />}
                    {modal === "edit profile" && <EditProfile />}
                    {modal === "create project" && <CreateProjectForm />}
                  </Modal>
                )}
              </>
            }
          />


          {/* {user && user.account_type === "supplier" &&
            <Route path={`/user/${user.id}`}
              element={<Supplier />}
            />} */}

          {/* {user && user.account_type === "supplier" &&
            <Route path={`/user/${user.id}`}>
              <>
                <Map />
                <Supplier />
              </>
            </Route>
          } */}

          <Route path="*" element={<h2>404: Page not found</h2>} />

        </Routes>
      </main>
    </AppContext.Provider>
  );
}

export default App;
