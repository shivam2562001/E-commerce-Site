import React, { useContext, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from "@material-ui/lab";
import Box from '@material-ui/core/Box';
import { AuthContext, ACTIONS } from "../context/authContext";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loader from "react-loader-spinner";
import register from "../apis/authapis/signupApi";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding:"20px",
    background: "#FFFFFF",
    boxShadow: "0px 4px 24px 6px rgba(105, 184, 228, 0.61)",
    borderRadius: "20px",
    outline: 'none'
  },
  cardcontainer : {
  
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'linear-gradient(89.12deg, rgba(51, 51, 236, 0.89) 46.57%, rgba(101, 101, 234, 0.82) 97.67%)',
    outline: "none !important",
    border:"0 !important"
  },
  alert: {
    width: "100%",
    outline: "none !important",
    border:"0 !important",
    fontSize:"12px",
    fontWeight:"400px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",

  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [username,setUsername] = useState('')
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(false);
  const { authState, dispatch } = useContext(AuthContext);
  
    const handleSignup = async (e) => {
     try {
       e.preventDefault();
       setLoading(true);
       const res = await register(username, email, password);
       if(res){const payload = res.data
       dispatch({ type: ACTIONS.SIGNUP_SUCESS, payload });
       setLoading(false);
       setMessage(true);
      }
     } catch (error) {
       const payload = {
         ...error.response.data,
       };
       dispatch({ type: ACTIONS.SIGNUP_FAILED, payload });
       setLoading(false);
     }
   };


  return (
    <Container component="main" maxWidth="xs" >
      {/* <div className={classes.cardcontainer}> */}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {authState.error ? (
          <Alert
            severity="error"
            className={classes.alert}
            onClose={() => {
              const payload = {
                error: null,
              };
              dispatch({ type: ACTIONS.SET_ERROR, payload });
            }}
          >
            {authState.error}
          </Alert>
        ) : (
          <></>
        )}
        {message ? (
          <Alert
            severity="info"
            className={classes.alert}
          >
            {authState.message}
          </Alert>
        ) : (
          <></>
        )}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="Username"
            onChange={(e)=>{setUsername(e.target.value)}}
            value={username}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e)=>{handleSignup(e)}}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color="#f3f3f3"
                height={30}
                width={30}
                timeout={3000}
              />
            ) : (
              <>Sign Up</>
            )}
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link to="/login" >
                {"Already have account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* </div> */}
      {/* <Box mt={8}>
        /* <Copyright />
      </Box> */}

    </Container>
  );
}