import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "./redux/AuthSlice";
import { resetThemeChanged } from "./redux/editorSettingsSlice";
import { clearPersistedStorage } from "./redux";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Rename the function to prevent naming conflict
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/v1/user/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();

      if (data.status === "Success") {
        await clearPersistedStorage();
        dispatch(resetThemeChanged());
        dispatch(logout());

        navigate("/auth");
      }
    } catch (err) {
      console.log(err);
    }
    // window.location.reload();
  };

  // Trigger the logout process
  React.useEffect(() => {
    handleLogout();
  }, []); // Empty dependency array ensures this runs once on component mount

  return <div>Logout</div>;
}

export default Logout;
