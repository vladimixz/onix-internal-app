import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import background from '../../images/background-home.png';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
  },
  back: {
    position: 'absolute'
  },
});

export default class Header extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <View style={styles.content}>
        <Image style={styles.back} source={background} />
        { children }
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
