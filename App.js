import React, {Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList} from 'react-native';
import FeedItem from './components/FeedItem';

//const API_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page=1'

export default class App extends Component {
  state = {
    isLoading : false,
    listArticles: [],
    totalResults: 0,
    page: 1 ,
    isLoadMore: false,
  }

  componentDidMount = async () =>  {
    const {page} = this.state;
    this.setState({isLoading: true});
    this.callApi(page);
  };

  callApi= async page =>{
    const {listArticles} =this.state;
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page=${page}`);
    await setTimeout(() => {}, 2000);
    const jsonResponse = await response.json();
    this.setState({
      page: page,
      isLoading: false,
      listArticles: listArticles.concat( jsonResponse.articles),
      totalResults: response.totalResults,
    });

  };

  onEndReached = async () =>{
    const {page} = this.state;
    const newPage= page+1;
    this.callApi(newPage);
    
  };

  renderItem = ({item}) => {
    return <FeedItem item={item} />
  };

  renderFooter = () => {
    return <ActivityIndicator color='blue' animating={true} />;
  };

  render() {
    const {isLoading, listArticles} = this.state;
    if(isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color='blue' animating={isLoading} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList 
          style={styles.flatList}
          data={listArticles}
          renderItem={this.renderItem}
          onEndReached= {this.onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent= {this.renderFooter()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList:{
    marginHorizontal: 15,
    marginVertical: 15,
  },
});
