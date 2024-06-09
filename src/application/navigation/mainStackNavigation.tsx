import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PublicRouteParamType, PublicRoutes} from './routes/publicRoute.config';
import SplashScreen from '../../presentation/screens/splash/splashScreen';
import HomeScreen from '../../presentation/screens/home/homeScreen';

const Stack = createStackNavigator<PublicRouteParamType>();

// Navigation Types for all combined routes
export type MainNavigationType = NavigationProp<PublicRouteParamType>;

// Navigation Definations
const MainNavigation = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={PublicRoutes.Splash}
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={PublicRoutes.Home}
          component={HomeScreen}
          options={{
            title: 'Latest',
            headerTitleAlign: 'center',
            headerStyle: {elevation: 0},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
