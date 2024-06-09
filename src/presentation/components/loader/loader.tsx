import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {commonStyles} from '../../../application/utils/commonStyles';
import {title} from '../../../application/utils/colors';

// Screen loader
const Loader = () => {
  return (
    <View
      style={[
        commonStyles.flex1,
        commonStyles.justifyContentCenter,
        commonStyles.alignItemsCenter,
      ]}>
      <ActivityIndicator size={'large'} color={title} />
    </View>
  );
};

export default Loader;
