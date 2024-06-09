import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {
  PublicRouteParamType,
  PublicRoutes,
} from '../../../application/navigation/routes/publicRoute.config';
import {useFetchIsLoggedIn} from './hooks/useIsLoggedIn';

type SplashScreenProps = StackScreenProps<
  PublicRouteParamType,
  PublicRoutes.Splash
>;

const SplashScreen = ({route}: SplashScreenProps) => {
  useFetchIsLoggedIn();

  return (
    <SafeAreaView>
      <View>
        <Text>Splash</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
