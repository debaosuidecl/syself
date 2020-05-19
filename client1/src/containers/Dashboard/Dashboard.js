import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
  const { regComplete } = useContext(AuthContext);
  return (
    <Layout>
      <h2 style={{ textAlign: "center" }}>Dashboard Layout</h2>
    </Layout>
  );
}

export default Dashboard;
