import React, { useState } from "react";
// import "../LogInForm.css"

type LogInFormProps = {
  onClose: () => void;
};

export default function LogInForm({ onClose }: LogInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <form onSubmit={handleSubmit} className="form-form">
        <h2 className="form-title">Log in</h2>
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
      <button
        type="submit"
        className="form-button"
      >Log in</button>
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
