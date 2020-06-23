import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { withRouter } from "react-router";

function ErroPage(props) {
  const { loading, token, regComplete } = useContext(AuthContext);

  useEffect(() => {
    console.log(document.referrer, "error");
    if (document.referrer.indexOf("register")) {
      props.history.push("/");
    }
  }, []);

  useEffect(() => {
    // console.log(props.match.path);

    if (props.match.path === "/" && token && regComplete) {
      props.history.push("/dashboard");
    }
  });
  return <div style={{ opacity: loading ? 0 : 1 }}>Page not available</div>;
}

export default withRouter(ErroPage);
