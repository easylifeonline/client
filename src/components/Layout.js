import React from 'react';
import { Outlet } from 'react-router-dom';
import TrackVisit from "../components/websiteData/TrackVisit";

const Layout = () => {
  return (
    <div>
      <TrackVisit />
      <Outlet />
    </div>
  );
};

export default Layout;
