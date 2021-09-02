import React from "react";
import VideoList from "./VideoList";
import VideoFilters from "./VideoFilters";

const DashboardPage = () => {
  return (
    <div>
      <VideoFilters />
      <VideoList />
    </div>
  );
};

export default DashboardPage;
