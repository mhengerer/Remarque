import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./beep.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Journal from "./pages/Journal";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// TODO: Add a function to automatically either:
// TODO: Route to this week's spread, or make one if there isn't one 

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* TODO: Update this route to be /spreads/_id */}
            <Route path="/" element={<Journal />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
