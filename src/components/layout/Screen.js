import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default class Screen extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <View style={styles.container}>
        {children}
      </View>
    );
  }
}

Screen.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]).isRequired
};
