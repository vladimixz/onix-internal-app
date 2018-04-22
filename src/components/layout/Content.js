import React from 'react';
import { StyleSheet, View, Image } from 'react-native';


export default class Header extends React.Component {
  render() {
    return (
      <View style={ styles.content }>
          <Image style={ styles.back } source={ require('../../images/background-home.png' )}/>
          { this.props.children }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
  },
  back: {
    position: 'absolute'
  },
});
