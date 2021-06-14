
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Main from './pages/main';


function Routes() {
  return (
    <NavigationContainer>
        <SignIn></SignIn>
    </NavigationContainer>
  );
}

export default Routes;