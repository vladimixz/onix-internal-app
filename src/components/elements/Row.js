import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10
  }
});

export default class Row extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <View style={styles.infoRow}>
        {children}
      </View>
    );
  }
}

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ])
};

Row.defaultProps = {
  children: null
};
