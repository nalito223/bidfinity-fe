import React, { useState } from "react";
import "./CreateAccountForm.css"

type CreateAccountFormProps = {
  onClose: () => void;
};

export default function CreateAccountForm({ onClose }: CreateAccountFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle create account logic here
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
      </label>
      <label
        className="form-label"
      >
        <input
          className="form-input"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
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
          <option className="form-option" value="">I am a...</option>
          <option className="form-option" value="buyer">Buyer</option>
          <option className="form-option" value="seller">Seller</option>
        </select>
      </label>
      <button
        type="submit"
        className="form-button"
      >Create Account</button>
      <button
        type="button"
        onClick={onClose}
        className="form-button"
      >
        Cancel
      </button>
    </form>
  );
}