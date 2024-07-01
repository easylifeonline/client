import React from 'react';
import Footer from './components/Footer';
import AppRouter from "./components/routing/routers/AppRouter";
import "./App.scss";

const App = () => {
  return (
    <div className="app-container">
      <div className="content-container">
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
};

export default App;

