import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Landing from './components/landing';
import Photos from './components/photos';

const RootRoutes = (props) => (
  <Router>
    <Routes>
      <Route exact path='/' element={<Landing />} />
      <Route exact path='/photos/:slug' element={<Photos {...props} />} />
    </Routes>
  </Router>
);

export default RootRoutes;
