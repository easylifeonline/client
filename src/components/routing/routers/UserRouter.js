import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Electronic from '../../services/Electronic';
import HouseRenting from '../../services/HouseRenting';

const UserRouter = ({ base }) => {
    return (
        <Router>
            <Route path={"/update"} element={<HouseRenting />} />
            <Route path={"/orders"} element={<Electronic />} />
        </Router>
    );
};

export default UserRouter;