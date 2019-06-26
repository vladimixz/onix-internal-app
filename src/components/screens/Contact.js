import React from 'react';
import {
  Text, StyleSheet, View, TextInput, TouchableOpacity, Alert
} from 'react-native';
import PropTypes from 'prop-types';
import * as SecureStore from 'expo-secure-store';
import Screen from '../layout/Screen';
import Content from '../layout/Content';
import Row from '../elements/Row';
import Footer from '../layout/Footer';
import NavigateButtons from '../elements/NavigateButtons';
import getEnvVars from '../../config/environment';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 20,
    marginLeft: 20
  },
  picture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20
  },
  email: {
    marginTop: 10
  },
  textTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20
  },
  textInput: {
    flex: 1,
    height: 40
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0093ff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRightWidth: 0.5,
    borderRightColor: '#d6d7da'
  },
  whiteText: {
    flex: 1,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      message: 'Hello, I have a project for you!'
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    SecureStore.getItemAsync('userProfile')
      .then((res) => {
        const result = JSON.parse(res);
        this.setState({
          name: result.name,
          email: result.email
        });
      });
  };

  sendMessage = (event) => {
    const url = `${getEnvVars}/onix-admin/api/leads/register`;
    const { name, email, message } = this.state;
    const formData = new FormData(event.target);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.response);
          if (res.error) {
            this.showAlert('Error', 'Something wrong, please, try again later');
          } else {
            this.showAlert('Success', 'Thanks! We`ll reply as soon as possible.');
          }
        } else {
          this.showAlert('Error', 'Something wrong, please, try again later');
        }
      }
    };
    xhr.open('POST', url);
    xhr.send(formData);
  }

  showAlert(status, text) {
    Alert.alert(
      status,
      text,
      [{ text: 'OK' }],
      { cancelable: false }
    );
  }

  render() {
    const { name, email, message } = this.state;
    const { navigation } = this.props;
    return (
      <Screen>
        <View style={styles.wrapper}>
          <Content>
            <Row>
              <Text style={styles.textTitle}>Let us know how we can help you.</Text>
            </Row>
            <Row>
              <Text style={styles.text}>Send us your question or share an idea with us.</Text>
            </Row>
            <Row>
              <Text style={styles.email}>
                Name:
                {name}
              </Text>
            </Row>
            <Row>
              <Text style={styles.email}>
                Email:
                {email}
              </Text>
            </Row>
            <Row>
              <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={4}
                onChangeText={text => this.setState({ message: text })}
                value={message}
              />
            </Row>
            <Row>
              <TouchableOpacity style={styles.button} onPress={this.sendMessage}>
                <Text style={styles.whiteText}>Contact us</Text>
              </TouchableOpacity>
            </Row>
          </Content>
        </View>
        <Footer>
          <NavigateButtons navigation={navigation} />
        </Footer>
      </Screen>
    );
  }
}

Contact.propTypes = {
  navigation: PropTypes.shape({}).isRequired
};
