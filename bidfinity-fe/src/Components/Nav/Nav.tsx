import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../App/AppContext';
import React from 'react';
import "./Nav.css"

// type NavProps = {
//   openModal: (selectedForm: string) => void;
// };

const Nav: React.FC = () => {
  const { user, handleLogin, openModal, handleLogout, } = useContext(AppContext);

  // const handleLogout = () => {
  //   handleLogin(null);
  // };

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <NavLink to="/">
          <h1 className="nav-logo">bid<span className="green">finity</span></h1>
        </NavLink>
      </div>

      <div className="nav-right">
        {!user ?
          <>
            <button className="log-in-button"
              onClick={(e) => {
                e.preventDefault();
                openModal("login");
              }}
            >Log in</button>
            <button className="sign-up-button"
              onClick={(e) => {
                e.preventDefault();
                openModal("signup");
              }}
            >Sign up</button>
          </>
          :
          <>
            <p>Welcome, {user.first_name}</p>
            <NavLink to={`/user/${user.id}`}>
            <button
              className="log-in-button"
            >Dashboard</button>
            </NavLink>
            <button
              className="sign-up-button"
              onClick={() => handleLogout()}
            >Log out</button>
          </>
        }
      </div>
    </nav>
  );
}

export default Nav