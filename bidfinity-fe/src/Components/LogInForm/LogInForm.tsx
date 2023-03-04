import React, { useState, useContext } from "react";
import { AppContext } from '../App/AppContext';

export default function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { closeModal, accountsData, handleLogin } = useContext(AppContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    const matchingAccount = accountsData.find(account => account.email === email && account.password === password);
    if (matchingAccount) {
      console.log("User logged in successfully:", matchingAccount);
      closeModal()
      handleLogin(matchingAccount)
      // Set user in AppContext here using handleLogin() function
    } else {
      console.log("Invalid email or password");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-form">
      <h2>Log in</h2>
      <label className="form-label">

        <input
          placeholder="Email"
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label
        className="form-label"
      >

        <input
          placeholder="Password"
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="form-button"
      >Log in</button>
      <button
        type="button"
        onClick={closeModal}
        className="form-button"
      >Cancel</button>
    </form>
  );
}
