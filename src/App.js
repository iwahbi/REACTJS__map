import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegistrationPage from './pages/RegistrationPage';
import MapView from './pages/MapView';
import './styles.css';

const App = () => {
  const friendsPositions = [
    { username: 'Friend1', position: { latitude: 51.505, longitude: -0.09 } },
    { username: 'Friend2', position: { latitude: 51.51, longitude: -0.1 } },
  ];

  const currentUserPosition = {
    latitude: 51.508,
    longitude: -0.11,
  };

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route
          path="/dashboard"
          render={() => (
            <>
              <DashboardPage />
              <MapView
                friendsPositions={friendsPositions}
                currentUserPosition={currentUserPosition}
              />
            </>
          )}
        />
        <Route path="/register" component={RegistrationPage} />
      </Switch>
    </Router>
  );
};

export default App;
