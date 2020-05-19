import React, { useEffect } from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { SERVER_PORT } from "../../components/Global/Global";
import axios from "axios";
function SocialFetch(props) {
  const mountFunction = async () => {
    // console.log(props.location.search)
    try {
      const queryObject = queryString.parse(props.location.search);
      console.log(queryObject);
      localStorage.setItem("j", queryObject.j);
      if (queryObject.status == "true") {
        // return props.history.push("/");
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/register";
        //   props.history.push("/register");
      }
      // let config = {
      //     headers: {
      //       'x-auth-token': queryObject.j
      //     }
      //   };
      // let url = `${SERVER_PORT}/api/auth`

      // try {

      //     let {data} = await axios.get(url,config);
      //     // console.log(data);

      // } catch (error) {
      //     console.log(error.response)
      // }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function asyncWrapper() {
      return mountFunction();
    }
    asyncWrapper();
  }, []);
  return <div></div>;
}

export default withRouter(SocialFetch);
