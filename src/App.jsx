import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.scss';
import Home from './containers/Home/Home.component';
import Repositories from './containers/Repositories/Repositories.component'

const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

const Routes = () => {
  return (
    <div className="app">
      <div className='navbar'>GitHub Repositories</div>
      <div className="app-content">
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/repos' exact>
            <Repositories />
          </Route>
        </Switch>
      </div>
    </div >
  );
}

export default App;
