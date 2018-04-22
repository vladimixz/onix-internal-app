import React from 'react';
import { StyleSheet, View } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={ styles.footer }>
        <View style={ styles.container }>
          { this.props.children }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    height: 50
  },
});
