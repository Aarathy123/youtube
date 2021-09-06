import React from "react";
import VideoList from "./VideoList";
import VideoFilters from "./VideoFilters";
import NewVideoPage from "./NewVideoPage";

const DashboardPage = () => {
  return (
    <div>
      <VideoFilters />
      <VideoList />
      <NewVideoPage />
    </div>
  );
};

export default DashboardPage;
