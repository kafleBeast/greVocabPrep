import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Definition from './Definition';
import LandingPage from './LandingPage';
import Navbar from './Navbar';
import Quiz from './Quiz';
import Synonym from './Synonym';
import NotFound from './NotFound';
import Admin from './Admin';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/Quiz">
              <Quiz />
            </Route>
            <Route path="/Definition">
              <Definition />
            </Route>
            <Route path="/Synonym">
              <Synonym />
            </Route>
            <Route path="/Admin">
              <Admin />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
