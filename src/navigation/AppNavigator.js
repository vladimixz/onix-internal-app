import { createSwitchNavigator } from 'react-navigation';

import AppStack from './AppStack';

export default createSwitchNavigator({
  App: AppStack,
});
