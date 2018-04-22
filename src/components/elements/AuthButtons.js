import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { SecureStore } from 'expo';

export default class AuthButtons extends React.Component {

  async logIn() {
    let userProfile = await SecureStore.getItemAsync('userProfile');
    if (!userProfile) {
      const { navigate } = this.props.navigation;
      const { manifest } = Expo.Constants;
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(manifest.facebookAppId, {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.width(400).height(400)&access_token=${token}`)
          .then(res => res.json())
          .then(res => {
            SecureStore.setItemAsync('userProfile', JSON.stringify(res));
            navigate('Home', { redirect: 'Profile' })
          });
      }
    }

  }

  render() {
    return (
      <View style={ styles.buttons }>
        <TouchableOpacity style={ styles.loginButton } onPress={ this.logIn.bind(this) }>
          <Text style={ styles.whiteText }>Continue with facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
