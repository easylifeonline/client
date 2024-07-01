import React from 'react';
import AppRouter from "./components/routing/routers/AppRouter";
import "./App.scss";

const App = () => {
  return (
    <div className="app-container">
      <div className="content-container">
        <AppRouter />
      </div>
    </div>
  );
};

export default App;

