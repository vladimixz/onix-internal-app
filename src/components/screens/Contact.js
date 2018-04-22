import React from 'react';
import { Text, Image, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Screen from '../layout/Screen';
import Content from '../layout/Content';
import Row from '../elements/Row';
import Footer from '../layout/Footer';
import NavigateButtons from '../elements/NavigateButtons';
import { SecureStore } from "expo";
import getEnvVars from "../../config/environment";

export default class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      message: 'Hello, I have a project for you!'
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
          email: result.email
        })
      });
  };

  sendMessage(event) {
    let url = getEnvVars + "/onix-admin/api/leads/register";
    let formData = new FormData(event.target);
    formData.append('name', this.state.name);
    formData.append('email', this.state.email);
    formData.append('message', this.state.message);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let res = JSON.parse(xhr.response);
          if (res.error) {
            this.showAlert('Error', 'Something wrong, please, try again later');
          } else {
            this.showAlert('Success', 'Thanks! We`ll reply as soon as possible.');
          }
        } else {
          this.showAlert('Error', 'Something wrong, please, try again later');
        }
      }
    }.bind(this);
    xhr.open("POST", url);
    xhr.send(formData);
  }

  showAlert(status, text) {
    Alert.alert(
      status,
      text,
      [{ text: 'OK' }],
      { cancelable: false }
    )
  }

  render() {
    return (
      <Screen>
        <View style={ styles.wrapper }>
          <Content>
            <Row>
              <Text style={ styles.textTitle }>Let us know how we can help you.</Text>
            </Row>
            <Row>
              <Text style={ styles.text }>Send us your question or share an idea with us.</Text>
            </Row>
            <Row>
              <Text style={ styles.email }>Name: { this.state.name }</Text>
            </Row>
            <Row>
              <Text style={ styles.email }>Email: { this.state.email }</Text>
            </Row>
            <Row>
              <TextInput
                style={ styles.textInput }
                multiline={ true }
                numberOfLines={ 4 }
                onChangeText={ (message) => this.setState({ message: message }) }
                value={ this.state.message }
              />
            </Row>
            <Row>
              <TouchableOpacity style={ styles.button } onPress={ this.sendMessage.bind(this) }>
                <Text style={ styles.whiteText }>Contact us</Text>
              </TouchableOpacity>
            </Row>
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