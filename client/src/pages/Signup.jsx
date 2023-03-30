import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { SplashScreen } from "../components/index";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(formState);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <SplashScreen/>
      <h1 className="text-5xl font-bold">Sign Up!</h1>
      <p className="py-6">Create an account to make your digital bullet dreams come to life!</p>
    </div>
    <form onSubmit={handleFormSubmit}>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        
        <div className="form-control">
          <label htmlFor="username" className="label">
            <span className="label-text">Username</span>
          </label>
          <input 
            placeholder="username"
            name="username"
            type="text"
            value={formState.name}
            onChange={handleChange}
            className="input input-bordered" />
        </div>

        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input 
            placeholder="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            className="input input-bordered" />
        </div>

        <div className="form-control">
          <label htmlFor="pwd" className="label">
            <span className="label-text">Password</span>
          </label>
          <input 
            placeholder="password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange} 
            className="input input-bordered" />
          
        <Link to="/login" className="pt-5">← Go to Login</Link>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </div>
    </div>
    </form>
  </div>
</div>

  );
};

export default Signup;
