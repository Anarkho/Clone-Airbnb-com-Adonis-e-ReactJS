
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,} from '@react-navigation/stack'
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Main from './pages/main';

const Stack = createStackNavigator();
function Routes() {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} >
                <Stack.Screen name='SignIn' component={SignIn}/>
                <Stack.Screen  name ='SignUp' component={SignUp}/>
                <Stack.Screen 
                name='Main' 
                component={Main} 
                options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;