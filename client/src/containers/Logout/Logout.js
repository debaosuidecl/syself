import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Logout() {
  const { logOut } = useContext(AuthContext);
  useEffect(() => {
    logOut().then(() => {
      window.location.href = "/";
    });
  }, []);
  return <div></div>;
}

export default Logout;
