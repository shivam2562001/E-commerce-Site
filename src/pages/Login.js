import React, { useContext, useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import Loader from "react-loader-spinner";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Alert, AlertTitle } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { AuthContext, ACTIONS } from "../context/authContext";
import login from "../apis/authapis/loginApi";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import verify from "../apis/authapis/verifyToken";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    background: "#FFFFFF",
    boxShadow: "0px 4px 24px 6px rgba(105, 184, 228, 0.61)",
    borderRadius: "20px",
    outline: "none",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background:
      "linear-gradient(89.12deg, rgba(51, 51, 236, 0.89) 46.57%, rgba(101, 101, 234, 0.82) 97.67%)",
    outline: "none !important",
    border: "0 !important",
  },
  alert: {
    width: "100%",
    outline: "none !important",
    border: "0 !important",
    fontSize: "14px",
    fontWeight: "400px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);
  const { authState, dispatch } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    const source = axios.CancelToken.source();
    verifyToken(source);
    return () => source.cancel();
  }, []);

  const verifyToken = async (source) => {
    try {
      const res = await verify(authState.token, source);
      if (res) {
        const payload = {
          isAuthenticated: res.data.isAuthenticated,
          user: {
            id: res.data.userId,
            email: res.data.email,
          },
        };
        dispatch({ type: ACTIONS.VERIFY_ACCESS_TOKEN, payload });
        history.push("/");
      }
    } catch (error) {
      localStorage.removeItem("access");
      const payload = {
        ...error.response.data,
      };
      dispatch({ type: ACTIONS.SET_ERROR, payload });
    }
  };

  const handlelogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await login(email, password);
      if (res) {
        localStorage.setItem("access", res.data.token);
        const payload = {
          token: res.data.token,
          user: {
            id: res.data.userId,
            email: res.data.email,
          },
          isAuthenticated: res.data.isAuthenticated,
          error: null,
          message: res.data.message,
        };
        dispatch({ type: ACTIONS.LOGIN_SUCESS, payload });
        setLoading(false);
        history.push("/");
      }
    } catch (error) {
      localStorage.removeItem("access")
      const payload = {
        ...error.response.data,
        token: null,
      };
      dispatch({ type: ACTIONS.LOGIN_SUCESS, payload });
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            {authState.error} — <strong>check it out!</strong>
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              handlelogin(e);
            }}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color="#f3f3f3"
                height={30}
                width={30}
              />
            ) : (
              <>Sign In</>
            )}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link to="/login">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>{/* <Copyright /> */}</Box>
    </Container>
  );
}
