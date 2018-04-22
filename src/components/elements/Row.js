import React from 'react';
import { StyleSheet, View } from 'react-native';

export default class Row extends React.Component {

  render() {
    return (
      <View style={styles.infoRow}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10
  }
});