import React from 'react';
import './App.css';
import ProPlayers from './containers/ProPlayers';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import RegisterScreen from './components/RegisterScreen';
import SigninScreen from './components/SigninScreen';

function App() {
  return (
    <div className="App">
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <ProPlayers />
    </div>
  );
}

export default App;
