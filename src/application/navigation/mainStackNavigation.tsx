import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import React from 'react';
import HomeScreen from '../../presentation/screens/home/homeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {selectAppSlice} from '../redux/slices/appSlice';
import {PublicRouteParamType, PublicRoutes} from './routes/publicRoute.config';
import {
  ProtectedRouteParamType,
  ProtectedRoutes,
} from './routes/protectedRoutes.config';
import {AuthRouteParamType, AuthRoutes} from './routes/authRoutes.config';
import SplashScreen from '../../presentation/screens/splash/splashScreen';
import LoginScreen from '../../presentation/screens/login/loginScreen';
import { ApiStatus } from '../../domain/enums/apiStatus';

const Stack = createStackNavigator<
  AuthRouteParamType & ProtectedRouteParamType & PublicRouteParamType
>();

export type MainNavigationType = NavigationProp<
  AuthRouteParamType & ProtectedRouteParamType & PublicRouteParamType
>;

const MainNavigation = (): React.ReactElement => {
  const appSliceObserver = useSelector(selectAppSlice);
  const {isLoading, isLoggedIn} = appSliceObserver;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading === ApiStatus.LOADING || isLoading === ApiStatus.IDLE ? (
          <>
            {/* TODO: Add your public Routes here */}
            <Stack.Screen name={PublicRoutes.Splash} component={SplashScreen} />
          </>
        ) : isLoggedIn ? (
          <>
            {/* TODO:  Add your Protected Routes here*/}
            <Stack.Screen name={ProtectedRoutes.Home} component={HomeScreen} />
          </>
        ) : (
          <>
            {/* TODO:  Add your Auth Routes here*/}
            <Stack.Screen name={AuthRoutes.Login} component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
