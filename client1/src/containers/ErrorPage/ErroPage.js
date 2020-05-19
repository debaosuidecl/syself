import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { withRouter } from "react-router";

function ErroPage(props) {
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    console.log(document.referrer, "error");
    if (document.referrer.indexOf("register")) {
      props.history.push("/");
    }
  }, []);
  return <div style={{ opacity: loading ? 0 : 1 }}>Page not available</div>;
}

export default withRouter(ErroPage);
