import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import Auth from "./auth";

const ProtectedRoute = (p) => {
  const nav = useNavigate();
  const [authorized, setauthorized] = useState(false);
  const 
};
