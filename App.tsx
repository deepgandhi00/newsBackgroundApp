/**
 * React Native Clean Architecture Template
 *
 * @format
 */

import React from 'react';
import MainNavigation from './src/application/navigation/mainStackNavigation';
import {Provider} from 'inversify-react';
import {container} from './src/application/di/container';

function App(): React.JSX.Element {
  return (
    <Provider container={() => container}>
      <MainNavigation />
    </Provider>
  );
}

export default App;
