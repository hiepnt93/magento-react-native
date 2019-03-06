import React, { Component } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import Sizes from '../../constants/Sizes';
import { getSearchProducts } from '../../actions';
import { ProductList } from '../common';

class SearchScreen extends Component {
  static navigationOptions = {
    title: 'Search',
    headerBackTitle: ' '
  };

  state = {
    input: '',
  };

  onEndReached = () => {
    const {
      canLoadMoreContent,
      loadingMore,
      products
    } = this.props;

    if (!loadingMore && canLoadMoreContent) {
      this.props.getSearchProducts(this.state.input, products.length);
    }
  }

  updateSearch = input => {
    this.setState({ input });
    this.props.getSearchProducts(input);
  };

  renderContent = () => {
    return (
      <ProductList
        products={this.props.products}
        onEndReached={this.onEndReached}
        canLoadMoreContent={this.props.canLoadMoreContent}
        searchIndicator
      />
      );
  };

  render() {
    const { searchInputStyle, containerStyle, searchStyle } = styles;
    const { input } = this.state;

    return (
      <View style={containerStyle}>
        <View style={searchInputStyle}>
          <SearchBar
            placeholder="Type here..."
            onChangeText={this.updateSearch}
            value={input}
            containerStyle={searchStyle}
            inputStyle={{ backgroundColor: '#DAE2EA' }}
            inputContainerStyle={{ backgroundColor: '#DAE2EA' }}
          />
        </View>
        <View style={{ flex: 1 }}>
          {this.renderContent()}
        </View>
      </View>
    );
  }
}

const styles = {
  searchInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingBottom: 5
  },
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchStyle: {
    marginTop: 5,
    backgroundColor: '#DAE2EA',
    borderRadius: 25,
    alignSelf: 'center',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    height: 55,
    width: Sizes.WINDOW_WIDTH * 0.9,
  },
  notFoundTextWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  notFoundText: {
    textAlign: 'center'
  },
};

const mapStateToProps = ({ search }) => {
  const { products, totalCount, loadingMore } = search;
  const canLoadMoreContent = products.length < totalCount;

  return { products, totalCount, canLoadMoreContent, loadingMore };
};


export default connect(mapStateToProps, { getSearchProducts })(SearchScreen);
