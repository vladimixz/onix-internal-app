import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../components/screens/Home';
import ProfileScreen from '../components/screens/Profile';
import NewsScreen from '../components/screens/News';
import ContactScreen from '../components/screens/Contact';

const Home = {
  screen: HomeScreen,
  headerMode: 'none',
  navigationOptions: {
    header: null
  },
};

const Profile = {
  screen: ProfileScreen,
  navigationOptions: {
    title: "Profile",
  }
};

const News = {
  screen: NewsScreen,
  navigationOptions: {
    title: "News",
  }
};

const Contact = {
  screen: ContactScreen,
  navigationOptions: {
    title: "Contact",
  }
};

export default createStackNavigator({
  Home,
  Profile,
  News,
  Contact
});
