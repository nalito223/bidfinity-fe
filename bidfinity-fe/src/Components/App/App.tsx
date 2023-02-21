
import { NavLink, Route, Routes } from "react-router-dom"
import React from "react"
import './App.css'
import Nav from '../Nav/Nav'
import LandingPage from "../LandingPage/LandingPage"

const App: React.FC = () => {
  return (
    <main className="App">
      <Nav />
      <Routes>
      <Route path="/"
          element={<LandingPage />}
        />
      </Routes>
    </main>
  );
}

export default App;
