/**
 * React Native Clean Architecture Template
 *
 * @format
 */

import React from 'react';
import MainNavigation from './src/application/navigation/mainStackNavigation';
import {Provider} from 'inversify-react';
import {container} from './src/application/di/container';
import {Provider as ReduxProvider} from 'react-redux';
import store from './src/application/redux/store';

function App(): React.JSX.Element {
  return (
    <Provider container={() => container}>
      <ReduxProvider store={store}>
        <MainNavigation />
      </ReduxProvider>
    </Provider>
  );
}

export default App;
