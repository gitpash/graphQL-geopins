import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';
import { withStyles } from '@material-ui/core/styles';
// import { from } from 'apollo-link';
import Typography from '@material-ui/core/Typography';
import Context from '../../context';
import { ME_QUERY } from '../../graphql/queries';
import {BASE_URL} from '../../client';

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken },
      });
      const { me } = await client.request(ME_QUERY);
      dispatch({
        type: 'LOGIN_USER',
        payload: { me, isLoggedIn: googleUser.isSignedIn() },
      });
    } catch (error) {
      onFailure(error);
    }
  };

  const onFailure = err => {
    console.error('error loggin in', err);
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: 'rgb(66, 133, 244)' }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId="897348748825-6s523sqhg1tndbpt3k79cj7k726hsk2d.apps.googleusercontent.com"
        onFailure={onFailure}
        onSuccess={onSuccess}
        isSignedIn={true}
        buttonText="Login with Google"
        theme="dark"
      />
    </div>
  );
};

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default withStyles(styles)(Login);
