import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    height: 50
  },
});

export default class Header extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <View style={styles.footer}>
        <View style={styles.container}>
          { children }
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]).isRequired
};
