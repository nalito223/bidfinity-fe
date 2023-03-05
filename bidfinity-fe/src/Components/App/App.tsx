import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import React, { useState, useCallback } from "react";
import './App.css'
import Nav from '../Nav/Nav'
import LandingPage from "../LandingPage/LandingPage"
import Footer from "../Footer/Footer"
import Modal from "../Modal/Modal"
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm"
import LogInForm from "../LogInForm/LogInForm"
import { AppContext } from "./AppContext";
import Buyer from "../Buyer/Buyer"
import Supplier from "../Supplier/Supplier"
const { accountsData, uploadsData, projectsData } = require('../fakeData/data');


type Account = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  account_type: 'buyer' | 'supplier';
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

// interface AppContextType {
//   accounts: Account[];
//   uploads: Upload[];
//   projects: Project[];
// }

interface Project {
  id: number;
  project_title: string;
  created_date: string;
  location: string;
  project_summary: string;
  status: 'in progress' | 'completed';
  contact_information: string;
  upload_id: number;
}



const App: React.FC = () => {
  const [user, setUser] = useState<Account | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState("");
  const navigate = useNavigate();



  const handleLogin = (matchingAccount: Account) => {
    setUser(matchingAccount);
    navigate(`/user/${matchingAccount.id}`);
    console.log("made it to handlelogin", user)
  };

  const handleLogout = () => {
    setUser(null)
    navigate(`/`);
  }

  const handleCreateAccount = () => {
    console.log("made it to handle create account")
  }

  const openModal = useCallback((selectedForm: string) => {
    if (selectedForm === "signup") {
      setModal("signup")
    } else if (selectedForm === "login") {
      setModal("login")
    }

    setShowModal(true);

  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    openModal("signup");
  }



  return (
    <AppContext.Provider value={{
      user,
      handleLogin,
      handleLogout,
      openModal,
      closeModal,
      handleOpenModal,
      handleCreateAccount,
      accountsData,
      // uploadsData,
      // projectsData,
    }}>
      <main className="App">
        <Nav />
        <Routes>
          <Route path="/"
            element={
              <>
                <LandingPage openModal={handleOpenModal} />
                {showModal && (
                  <Modal onClose={closeModal}>
                    {modal === "signup" && <CreateAccountForm />}
                    {modal === "login" && <LogInForm />}
                  </Modal>
                )}
                <Footer />
              </>
            }
          />
          {user && user.account_type === "buyer" &&
            <Route path={`/user/${user.id}`}
              element={ <Buyer />}
            />}
          <Route path="*" element={<h2>404: Page not found</h2>} />

          {user && user.account_type === "supplier" &&
            <Route path={`/user/${user.id}`}
              element={ <Supplier />}
            />}
          <Route path="*" element={<h2>404: Page not found</h2>} />
        </Routes>
      </main>
    </AppContext.Provider>
  );
}

export default App;
