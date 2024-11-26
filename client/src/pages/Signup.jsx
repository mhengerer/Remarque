import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { SplashScreen } from "../components/index";
import Logo from "../RemarqueSmallLogo.svg";

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
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-secondary to-primary">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold cursive-font">Remarque </h1>
          <h2 className="text-3xl mt-4 mb-5">
            simply put - a bullet journal application
          </h2>

          <SplashScreen />
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <img
                src={Logo}
                alt="remarque logo"
                className="w-15 h-20 mb-5 place-self-center"
              ></img>
              <h1 className="text-3xl font-bold">Sign Up Here!</h1>
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
                  className="input input-bordered"
                />
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
                  className="input input-bordered"
                />
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
                  className="input input-bordered"
                />

                <Link to="/login" className="pt-5">
                  ← Go to Login
                </Link>
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
