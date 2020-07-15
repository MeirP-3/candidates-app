import React, { useState } from 'react';
import { Route, Switch } from "react-router-dom";
import SignIn from './authentication/sign-in';
import SignUp from './authentication/sign-up';
import Main from './app-frame/main';
import { AuthenticationService } from './authentication/authentication.service';
import PrivateRoute from './authentication/private-route';

function App() {

  const [
    isLoggedIn,
    setIsLoggedIn
  ] = useState(AuthenticationService.isLoggedIn());

  return (
    <Switch>
      <Route path="/sign-in">
        <SignIn
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Route>

      <Route path="/sign-up">
        <SignUp
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}  
        />
      </Route>

      <PrivateRoute isLoggedIn={isLoggedIn} path="/">
        <Main setIsLoggedIn={setIsLoggedIn}/>
      </PrivateRoute>
    </Switch>
  );
}

export default App;