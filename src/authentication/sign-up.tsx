import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MaterialLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthenticationService } from './authentication.service';
import { AuthenticationProps, SignUpRequestData } from './authentication.types';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),

  email: Yup.string()
    .required('Email is required')
    .email('Email is not valid'),
    
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password should be at least 6 characters')
    .matches(/[A-z]/, 'Password should contain at least one letter')
    .matches(/\d/, 'Password should contain at least one digit')
});

export default function SignUp({ isLoggedIn, setIsLoggedIn }: AuthenticationProps) {

  const classes = useStyles();

  const [error, setError] = useState('');

  const onSubmit = ({ username, email, password}: SignUpRequestData, { setSubmitting }: any) => {
    AuthenticationService.signUp({
      username,
      email,
      password
    })
    .then(() => {
      setIsLoggedIn(true);
      setError('');
    })
    .catch(error => {
      setError(error.message);
    })
    .finally(() => {
      setSubmitting(false);
    });
  };

  return (
    isLoggedIn ?
    <Redirect to="/" />
    :

    <Container component="main" maxWidth="xs">

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >

          {props => {

            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;

            return (        
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="username"
                      name="username"
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      autoFocus
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.username && !!touched.username}
                      helperText={errors.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.email && !!touched.email}
                      helperText={errors.email}
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
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.password && !!touched.password}
                      helperText={errors.password}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}            
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <MaterialLink variant="body2" component={Link} to="/sign-in">
                      Already have an account? Sign in
                    </MaterialLink>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>        
      </div>

      <Box mt={8}>
        <Typography variant="body2" color="error" align="center">
          {error}
        </Typography>
      </Box>      
    </Container>
  );
}