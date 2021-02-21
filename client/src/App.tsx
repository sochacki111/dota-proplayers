import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ProPlayers from './containers/ProPlayers';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import RegisterScreen from './components/RegisterScreen';
import SigninScreen from './components/SigninScreen';
import { signout } from './actions/userActions';
// import { RootState } from './store';

function App() {
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  let routes = (
    <Switch>
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Redirect to="/signin" />
    </Switch>
  );

  if (userInfo) {
    routes = (
      <Switch>
        <Route path="/" exact component={ProPlayers} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <header>
        <div>
          <Link to="/">dota-proplayers</Link>
        </div>
        <div>
          {userInfo ? (
            <div>
              <Link to="#">{userInfo.email} </Link>
              <ul>
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </div>
      </header>
      <main>
        {routes}
      </main>
    </div>
  );
}

export default App;
