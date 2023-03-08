import React, { useState, useEffect, useContext } from "react";
import { AppContext } from '../App/AppContext';

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

const EditProfile: React.FC = () => {
  const { user, openModal } = useContext(AppContext);
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
  const [country, setCountry] = useState(user?.country);
  const [businessName, setBusinessName] = useState(user?.business_name);
  const [image, setImage] = useState(user?.image);

  useEffect(() => {
    setFirstName(user?.first_name);
    setLastName(user?.last_name);
    setEmail(user?.email);
    setPhoneNumber(user?.phone_number);
    setCountry(user?.country);
    setBusinessName(user?.business_name);
    setImage(user?.image);

  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    // const updatedUser: Account = {
    //   ...user,
    //   first_name: firstName,
    //   last_name: lastName,
    //   email,
    //   phone_number: phoneNumber,
    //   country,
    //   business_name: businessName,
    // };
    // onSave(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="form-form">
      <center>
        <h2>Edit profile</h2>
      </center>
      <br />

      <label htmlFor="firstName" className="form-label">First Name:</label>
      <input
        className="form-input add-width"
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <br />

      <label htmlFor="lastName" className="form-label">Last Name:</label>
      <input
        className="form-input"
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <br />

      <label htmlFor="email" className="form-label">Email:</label>
      <input
        className="form-input"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
      <input
        className="form-input"
        type="text"
        id="phoneNumber"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <br />

      <label htmlFor="country" className="form-label">Country:</label>
      <input
        className="form-input"
        type="text"
        id="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />

      <br />

      <label htmlFor="businessName" className="form-label">Business Name:</label>
      <input
        className="form-input"
        type="text"
        id="businessName"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
      />
      <br />
      <label htmlFor="image" className="form-label">Image:</label>
      <input
        className="form-input"
        type="text"
        id="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <br />
      <button
        className="log-in-button margin-above"
        type="submit"
      >Save</button>
    </form>
  );
};

export default EditProfile;
