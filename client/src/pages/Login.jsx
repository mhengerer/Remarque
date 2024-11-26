import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import Logo from "../RemarqueSmallLogo.svg";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
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
    <div className="hero min-h-screen bg-gradient-to-r from-primary to-secondary">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl cursive-font">
            Welcome Back Bullet Planner,<br></br> Please Log In!
          </h1>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <img
                src={Logo}
                alt="remarque logo"
                className="w-20 h-30 mb-5 place-self-center"
              ></img>
              <h1 className="text-3xl font-bold">Log In Here!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  placeholder="email"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  placeholder="password"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>
              {error ? (
                <div>
                  <p className="error-text">
                    The provided credentials are incorrect
                  </p>
                </div>
              ) : null}
              <div className="container my-1"></div>
              <Link to="/signup">← Go to Signup</Link>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
