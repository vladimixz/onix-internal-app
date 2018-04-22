import React from 'react';
import { Text, Image, StyleSheet, View, FlatList, TouchableWithoutFeedback, Linking } from 'react-native';
import Screen from '../layout/Screen';
import Content from '../layout/Content';
import Row from '../elements/Row';
import Footer from '../layout/Footer';
import NavigateButtons from '../elements/NavigateButtons';
import getEnvVars from "../../config/environment";

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
    let params = '?limit=' + this.state.limit; 
    if (this.state.page > 1) {
      let offset = (this.state.limit * this.state.page) - 1;
      params += '&offset=' + offset;
    }
    fetch(getEnvVars.apiUrl + '/onix-admin/api/blogs' + params)
      .then(res => res.json())
      .then(res => {
        this.setState({
          news: this.state.page === 1 ? res : [...this.state.news, ...res],
        })
      });
  }

  endReached = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.getBlogs();
      }
    );
  }

  goToDetail = (url) => {
    Linking.openURL(getEnvVars.apiUrl + '/blog/' + url);
  }

  render() {
    if (Object.keys(this.state).length === 0) return null;
    return (
      <Screen>
        <View style={ styles.wrapper }>
            <View>
              <FlatList
                data={ this.state.news }
                keyExtractor={ item => item._id }
                onEndReached={ this.endReached }
                onEndReachedThreshold={ 0.7 }
                renderItem={
                  ({ item }) => <TouchableWithoutFeedback onPress={() => { this.goToDetail(item.url)}}><View style={styles.contentRow}>
                    <Image style={ styles.picture } source={{ uri: getEnvVars.apiUrl + '/storage/' + item.picture }} />
                    <Text style={ styles.name }>{ item.title }</Text>
                  </View></TouchableWithoutFeedback>
                }
              />
            </View>
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
  },
  contentRow: {
    flex: 1,
    // flexDirection: 'row',
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