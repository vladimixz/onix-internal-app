import React from 'react';
import {
  Text, Image, StyleSheet, View, FlatList, TouchableWithoutFeedback, Linking
} from 'react-native';
import PropTypes from 'prop-types';
import Screen from '../layout/Screen';
import Footer from '../layout/Footer';
import NavigateButtons from '../elements/NavigateButtons';
import getEnvVars from '../../config/environment';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentRow: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  picture: {
    flex: 1,
    height: 100
  },
  name: {
    flex: 1,
    marginTop: 5
  }
});

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 5,
      news: []
    };
  }

  componentDidMount() {
    this.getBlogs();
  }

  getBlogs = () => {
    const { limit, page, news } = this.state;
    let params = `?limit=${limit}`;
    if (page > 1) {
      const offset = (limit * page) - 1;
      params += `&offset=${offset}`;
    }
    fetch(`${getEnvVars.apiUrl}/onix-admin/api/blogs${params}`)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          news: page === 1 ? res : [...news, ...res],
        });
      });
  }

  endReached = () => {
    const { page } = this.state;
    this.setState(
      {
        page: page + 1
      },
      () => {
        this.getBlogs();
      }
    );
  }

  goToDetail = (url) => {
    Linking.openURL(`${getEnvVars.apiUrl}/blog/${url}`);
  }

  render() {
    if (Object.keys(this.state).length === 0) return null;
    const { news } = this.state;
    const { navigation } = this.props;
    return (
      <Screen>
        <View style={styles.wrapper}>
          <View>
            <FlatList
              data={news}
              // eslint-disable-next-line no-underscore-dangle
              keyExtractor={item => item._id}
              onEndReached={this.endReached}
              onEndReachedThreshold={0.7}
              renderItem={
                  ({ item }) => (
                    <TouchableWithoutFeedback onPress={() => { this.goToDetail(item.url); }}>
                      <View style={styles.contentRow}>
                        <Image
                          style={styles.picture}
                          source={{ uri: `${getEnvVars.apiUrl}/storage/${item.picture}` }}
                        />
                        <Text style={styles.name}>{ item.title }</Text>
                      </View>

                    </TouchableWithoutFeedback>
                  )
                }
            />
          </View>
        </View>
        <Footer>
          <NavigateButtons navigation={navigation} />
        </Footer>
      </Screen>
    );
  }
}

News.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
