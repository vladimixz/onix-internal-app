import { StackNavigator } from 'react-navigation';
import Home from './screens/Home';
import Profile from './screens/Profile';
import News from './screens/News';
import Contact from './screens/Contact';

const Routes = StackNavigator(
  {
    Home: {
      screen: Home,
      headerMode: 'none',
      navigationOptions: {
        header: null
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: "Profile",
      }
    },
    Contact: {
      screen: Contact,
      navigationOptions: {
        title: "Contact",
      }
    },
    News: {
      screen: News,
      navigationOptions: {
        title: "News",
      }
    }
  },
  {
    cardStyle:{
      backgroundColor:"transparent",
      opacity:0.99
    }
  }
);

export default Routes