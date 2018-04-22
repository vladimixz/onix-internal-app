import React from 'react';
import { Text, Image, StyleSheet, View, TextInput, TouchableWithoutFeedback, Linking } from 'react-native';
import Screen from '../layout/Screen';
import Content from '../layout/Content';
import Row from '../elements/Row';
import Footer from '../layout/Footer';
import NavigateButtons from '../elements/NavigateButtons';
import { SecureStore } from "expo";
import getEnvVars from "../../config/environment";

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      avatar: null
    }
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    SecureStore.getItemAsync('userProfile')
      .then(res => {
        let result = JSON.parse(res);
        this.setState({
          name: result.name,
          avatar: result.picture.data.url
        })
      });
  };

  logout = () => {
    SecureStore.deleteItemAsync('userProfile').then(res => {
      this.props.navigation.navigate('Home');
    });
  }

  render() {
    return (
      <Screen>
        <View style={styles.wrapper}>
          <Content>
            <Row>
              {this.state.avatar &&
                <Image resizeMode='cover' style={styles.picture} source={{ uri: this.state.avatar }}/>
              }
            </Row>
            <Row style={ styles.nameContainer }>
              <Text style={ styles.name }>Hi, { this.state.name }</Text>
              <Text style={ styles.logout } onPress={ this.logout }>Logout</Text>
            </Row>
            <View style={ styles.read }>
              <Row>
                <Text>You can red our news</Text>
              </Row>
              <Row>
                <Text>
                  Or visit our site
              </Text>
                <TouchableWithoutFeedback onPress={() => { Linking.openURL(getEnvVars.apiUrl); }}>
                  <View>
                    <Text style={ styles.text }> onix-systems.com</Text>
                  </View>
                </TouchableWithoutFeedback>
              </Row>
              <Row>
                <Text>
                  Eventually, you can contact  us, and we will create future together
              </Text>
              </Row>
            </View>
          </Content>
        </View>
        <Footer>
          <NavigateButtons navigation={ this.props.navigation }/>
        </Footer>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 20,
    marginLeft: 20
  },
  picture: {
    flex: 1,
    height: 200,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    flex: 3,
    marginTop: 10
  },
  logout: {
    flex: 1,
    color: '#0093ff',
    marginTop: 10
  },
  read: {
    marginTop: 30
  },
  text: {
    color: '#0093ff'
  }
});