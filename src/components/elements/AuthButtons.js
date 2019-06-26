import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text
} from 'react-native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0093ff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  whiteText: {
    flex: 1,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default class AuthButtons extends React.Component {
  logIn = async () => {
    const userProfile = await SecureStore.getItemAsync('userProfile');
    if (!userProfile) {
      /* global Expo */
      const { navigation } = this.props;
      const { manifest } = Constants;
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(manifest.facebookAppId, {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.width(400).height(400)&access_token=${token}`)
          .then(res => res.json())
          .then((res) => {
            SecureStore.setItemAsync('userProfile', JSON.stringify(res));
            navigation.navigate('Home', { redirect: 'Profile' });
          });
      }
    }
  }

  render() {
    return (
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.loginButton} onPress={this.logIn}>
          <Text style={styles.whiteText}>Continue with facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AuthButtons.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
};
