import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
  },
  header: {
    flexDirection: 'row',
  }
});

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.container}>
          <Text>Header</Text>
        </View>
      </View>
    );
  }
}
