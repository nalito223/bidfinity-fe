import React, { useState, useContext } from "react";
import "./CreateAccountForm.css";
import { AppContext } from '../App/AppContext';

export default function CreateAccountForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { handleCreateAccount, closeModal, accountsData } = useContext(AppContext);

  const emailRegex = /^\S+@\S+.\S+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d).{8,}$/;

  const checkForExistingAccount = (newEmail: string): boolean => {
    const accountExists = accountsData.find((account) => account.email === newEmail);
    if (accountExists) {
      setEmailError("Account with this email already exists.")
      console.log("account already exists")
      return false
    } else {
      return true
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("MADE IT TO HANDLE SUBMIT");
    if (validateEmail(email) && validatePassword(password) && checkForExistingAccount(email)) {
      if (!userType) {
        //create an error for no usertype selected instead of using passowrd error
        setPasswordError("Use the dropdown to select user type.")
        return
      } else {
        setPasswordError('')
      }

      handleCreateAccount(email, password, userType);
      closeModal()
      setPassword('')
    }

    setConfirmPassword('')
    setPassword('')
  };

  const validateEmail = (email: string) => {
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    console.log(typeof password)
    if (!passwordRegex.test(password)) {

      setPasswordError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one digit.");
      return false;

    }
    if (password !== confirmPassword) {
      console.log(typeof confirmPassword)
      setPasswordError("Passwords do not match.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="form-form">
      <h2 className="form-title">Sign up</h2>
      <label className="form-label">
        <input
          className="form-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div className="error">{emailError}</div>}
      </label>
      <label className="form-label">
        <input
          className="form-input"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className="error">{passwordError}</div>}
      </label>
      <label className="form-label">
        <input
          placeholder="Confirm password"
          className="form-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <label className="form-label">
        <select
          className="form-select"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option className="form-option" value="" disabled>I am a...</option>
          <option className="form-option" value="buyer">Buyer</option>
          <option className="form-option" value="supplier">Supplier</option>
        </select>
      </label>
      <button
        type="submit"
        className="form-button"
      >
        Create Account
      </button>
      <button
        type="button"
        onClick={closeModal}
        className="form-button"
      >
        Cancel
      </button>
    </form>
  );
}
