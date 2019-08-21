import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Navigation';
import MainPage from './MainPage';

const AppRouter = () => {
  // TODO: use loading indicator instead
  return (
    <Suspense fallback="loading">
      <Router>
        <Route component={Navigation} />
        <Route path="/" exact component={MainPage} />
      </Router>
    </Suspense>
  );
};

export default AppRouter;
