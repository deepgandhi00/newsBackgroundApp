import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {
  PublicRouteParamType,
  PublicRoutes,
} from '../../../application/navigation/routes/publicRoute.config';
import {useInitializeDB} from './hooks/useInitializeDB';
import {commonStyles} from '../../../application/utils/commonStyles';
import {title} from '../../../application/utils/colors';

type SplashScreenProps = StackScreenProps<
  PublicRouteParamType,
  PublicRoutes.Splash
>;

// Splash Screen
const SplashScreen = ({route}: SplashScreenProps) => {
  useInitializeDB();

  return (
    <SafeAreaView style={[commonStyles.flex1]}>
      <View
        style={[
          commonStyles.flex1,
          commonStyles.alignItemsCenter,
          commonStyles.justifyContentCenter,
          commonStyles.container,
        ]}>
        <Text style={{fontSize: 48, fontWeight: '700', color: title}}>
          Smart
        </Text>
        <Text style={{fontSize: 64, fontWeight: '700', color: title}}>
          News
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
