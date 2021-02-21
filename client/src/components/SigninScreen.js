import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SigninScreen(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push('/');
    }
  }, [props.history, userInfo]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to={`/register`}>Create account</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    // <div>
    //   <form onSubmit={submitHandler}>
    //     <div>
    //       <h1>Sign In</h1>
    //     </div>
    //     {/* TODO Create Loading and Message component */}
    //     {loading && <p>Loading...</p>}
    //     {error && <p>{error.message}</p>}
    //     <div>
    //       <label htmlFor="email">Email address</label>
    //       <input
    //         type="email"
    //         id="email"
    //         placeholder="Enter email"
    //         required
    //         onChange={(e) => setEmail(e.target.value)}
    //       ></input>
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         id="password"
    //         placeholder="Enter password"
    //         required
    //         onChange={(e) => setPassword(e.target.value)}
    //       ></input>
    //     </div>
    //     <div>
    //       <label />
    //       <button type="submit">Sign In</button>
    //     </div>
    //     <div>
    //       <label />
    //       <div>
    //         <Link to={`/register`}>Create account</Link>
    //       </div>
    //     </div>
    //   </form>
    // </div>
  );
}
