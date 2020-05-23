import React from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Layout>
      {/* <a href="/register">register</a> */}

      <br></br>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        HOME
      </h1>
    </Layout>
  );
}

export default Home;
