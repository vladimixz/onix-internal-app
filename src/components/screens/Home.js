/* eslint-disable max-len */
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Svg, Path } from 'react-native-svg';
import * as SecureStore from 'expo-secure-store';
import Screen from '../layout/Screen';
import Content from '../layout/Content';
import Footer from '../layout/Footer';
import AuthButtons from '../elements/AuthButtons';
import NavigateButtons from '../elements/NavigateButtons';

const styles = StyleSheet.create({
  contentPage: {
    alignItems: 'center',
  },
  logo: {
    marginTop: 50
  },
  textWrap: {
    marginTop: 50
  },
  homeText: {
    textAlign: 'center',
    fontSize: 16
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  }
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userProfile: null };
    const { navigation } = this.props;
    const { params } = navigation.state;
    if (params && params.redirect) {
      navigation.navigate(params.redirect);
    }
  }

  async componentDidMount() {
    this.setState({ userProfile: await SecureStore.getItemAsync('userProfile') });
  }

  render() {
    const { userProfile } = this.state;
    const { navigation } = this.props;
    return (
      <Screen>
        <Content>
          <View style={styles.contentPage}>
            <Svg style={styles.logo} width={200} height={50} viewBox="0 0 391 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <Path fill="#0093ff" d="M51,76 C64.8071194,76 76,64.3594042 76,50 C76,35.6405958 64.8071194,24 51,24 C37.1928806,24 26,35.6405958 26,50 C26,64.3594042 37.1928806,76 51,76 Z M51,100 C22.8334764,100 0,77.6142389 0,50 C0,22.3857611 22.8334764,0 51,0 C79.1665236,0 102,22.3857611 102,50 C102,77.6142389 79.1665236,100 51,100 Z M176.033025,30.0001855 C178.036392,35.0007772 188.954164,62.0319835 191.046275,67.0306913 C192.49793,70.4991515 195.030217,71.0115767 195.997837,70.9991451 C198.840304,71.0055403 201.009717,69.5383843 201.015054,66.0004016 L200.999222,4.00059025 L225.998554,4.00059025 L225.998554,64.999813 C226.172613,86.1763901 210.599784,96.9357415 197.999302,96.9993985 C185.61219,97.0630555 173.778821,92.0991443 165.040933,70.0003497 C163.275471,65.6822895 154.008283,41.8819249 150.971073,35.0555786 C148.499105,29.4996567 146.554231,29.0273713 144.555669,29.0008549 C142.556998,28.9743371 139.999332,30.4985908 140.000851,33.9952764 L140.000851,95.9993985 L115.076875,96 L115.001518,35.0001757 C114.824817,13.9075747 130.104744,3.06484914 143.000771,3.00059025 C155.264713,2.93753429 167.179713,7.901478 176.033025,30.0001855 Z M271,96 L245,96 L245,4 L271,4 L271,96 Z M306.452657,50 C295.173008,40.5529246 288,26.3641357 288,10.5 C288,10.3333176 288.000792,10.1668201 288.002372,10.0005112 L288,10 L288,4 L313,4 L313,10 L313.004292,10 C313.001435,10.1663105 313,10.3329814 313,10.5 C313,25.6878314 324.864453,38 339.5,38 C354.135547,38 366,25.6878314 366,10.5 C366,10.3329814 365.998565,10.1663105 365.995708,10 L366,10 L366,4 L391,4 L391,10 L390.997629,10.0006091 C390.999208,10.1668855 391,10.3333503 391,10.5 C391,26.3641357 383.826992,40.5529246 372.547343,50 C383.708079,59.3474821 390.848304,73.337228 390.997612,88.9988315 L391,89 L391,96 L366,96 L366,89 L365.995708,89 C365.738721,74.0428669 353.974601,62 339.5,62 C325.025399,62 313.261279,74.0428669 313.004292,89 L313,89 L313,96 L288,96 L288,89 L288.002379,88.9998159 C288.151396,73.3378142 295.291687,59.3476779 306.452657,50 Z" />
            </Svg>
            <View style={styles.textWrap}>
              <Text style={styles.title}>Proven Software Development Outsourcing Provider in Ukraine</Text>
              <Text style={styles.homeText}>Hi, we are glad to see you!</Text>
              <Text style={styles.homeText}>We&apos;ll take you to the world of reactive mobile development.</Text>
            </View>
          </View>
        </Content>
        <Footer>
          {userProfile ? (
            <NavigateButtons navigation={navigation} />
          ) : (
            <AuthButtons navigation={navigation} />
          )}
        </Footer>
      </Screen>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        redirect: PropTypes.string
      })
    }).isRequired
  }).isRequired
};
