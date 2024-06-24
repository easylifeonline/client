import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Electronic from '../../services/Electronic';
import HouseRenting from '../../services/HouseRenting';

const ServiceRouter = ({ base }) => {
    return (
        <Router>
            <Route path={"/house-renting"} element={<HouseRenting />} />
            <Route path={"/electronic"} element={<Electronic />} />
        </Router>
    );
};

export default ServiceRouter;
