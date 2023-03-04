
import { NavLink, Route, Routes } from "react-router-dom"
import React, { useState, useCallback } from "react";
import './App.css'
import Nav from '../Nav/Nav'
import LandingPage from "../LandingPage/LandingPage"
import Footer from "../Footer/Footer"
import Modal from "../Modal/Modal"
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm"
import LogInForm from "../LogInForm/LogInForm"

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState("");

  const openModal = useCallback((selectedForm: string) => {
    if (selectedForm === "signup") {
      setModal("signup")
    } else if (selectedForm === "login") {
      setModal("login")
    }

    setShowModal(true);

    console.log("showModal", showModal)
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    openModal("signup");
  }
  return (
    <main className="App">
      <Nav openModal={openModal} />
      <Routes>
        <Route path="/"
          element={
            <>
              <LandingPage openModal={handleOpenModal} />
              {showModal && (
                <Modal onClose={closeModal}>
                  {modal === "signup" && <CreateAccountForm onClose={closeModal} />}
                  {modal === "login" && <LogInForm onClose={closeModal} />}
                </Modal>
              )}
              <Footer />
            </>
          }
        />
      </Routes>
    </main>
  );
}

export default App;


