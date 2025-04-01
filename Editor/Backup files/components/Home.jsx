import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/AuthSlice"; // Import login action

import HeroStatsPage from "./Landing";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const validateAccessToken = async () => {
      try {
        // Attempt to validate the access token
        const response = await fetch("/api/v1/user/profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.status === 403) {

          const refreshResponse = await fetch(
            "/api/v1/user/refreshAccessToken",
            {
              method: "POST",
              credentials: "include", // Include credentials to ensure cookies are sent
            }
          );
          const refreshData = await refreshResponse.json();

          if (refreshData.status === "Error") {
            // If refresh fails, log the user out
            dispatch(logout());
            navigate("/");
          }

          if (refreshData.status === "Success") {
            // If refresh is successful, dispatch login with new user data
            dispatch(
              login({
                full_name: refreshData.response.full_name,
                email: refreshData.response.email,
              })
            );
          }
        } else if (data.status === "Success") {
          // If access token is valid, dispatch login with existing user data
          dispatch(
            login({
              full_name: data.response.full_name,
              email: data.response.email,
            })
          );
        }
      } catch (err) {
        console.error("Error validating access token:", err);
      }
    };

    validateAccessToken();
  }, [dispatch, navigate]);

  return (
    <div className="">
      {/* Landing Page */}
      <HeroStatsPage />
    </div>
  );
}
