import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ProPlayers from './containers/ProPlayers';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import RegisterScreen from './components/RegisterScreen';
import SigninScreen from './components/SigninScreen';
import { signout } from './actions/userActions';
// import { RootState } from './store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1,
      marginLeft: theme.spacing(10)
    }
  })
);

function App() {
  const classes = useStyles();
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
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              DOTA Pro Players
            </Typography>
            {userInfo ? (
              <Button
                color="inherit"
                component={Link}
                to="#signout"
                onClick={signoutHandler}
              >
                Sign Out
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/signin">
                Sign In
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <main>{routes}</main>
    </div>
  );
}

export default App;
