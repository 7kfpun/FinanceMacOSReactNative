import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native-macos';

// 3rd party libraries
import { inject, observer } from 'mobx-react/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 15,
    height: 65,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  deleteIcon: {
    flex: 1,
    alignSelf: 'center',
  },
  deleteText: {
    fontSize: 15,
    color: '#FC3D39',
    textAlign: 'left',
  },
  stock: {
    flex: 8,
    flexDirection: 'column',
  },
  symbol: {
    flex: 1,
    flexDirection: 'row',
  },
  symbolText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
  },
  marketText: {
    fontSize: 15,
    color: '#A6A6A6',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
  },
  name: {
    flex: 1,
  },
  nameText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
  },
  move: {
    flex: 1,
    alignSelf: 'center',
  },
  moveText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
  },
});

@inject('listStore') @observer
export default class StockCell extends React.Component {
  onPressDelete(symbol) {
    console.log('onPressDelete', symbol);
    this.props.listStore.removeWatchlistItem(symbol);
  }

  render() {
    const { removeWatchlistItem, watchlistResult } = this.props.listStore;

    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.deleteIcon}
          onPress={() => this.onPressDelete(this.props.stock.symbol)}
          underlayColor="black"
        >
          <Text style={styles.deleteText}>
            ⓧ
          </Text>
        </TouchableHighlight>
        <View style={styles.stock}>
          <View style={styles.symbol}>
            <Text style={styles.symbolText}>
              {this.props.stock.symbol}
            </Text>
            <Text style={styles.marketText}>
              {watchlistResult && watchlistResult[this.props.stock.symbol] && watchlistResult[this.props.stock.symbol].StockExchange}
            </Text>
          </View>
          <View style={styles.name}>
            <Text style={styles.nameText}>
              {watchlistResult && watchlistResult[this.props.stock.symbol] && watchlistResult[this.props.stock.symbol].Name}
            </Text>
          </View>
        </View>

      </View>
    );
  }
}

StockCell.propTypes = {
  // watchlistResult: React.PropTypes.shape({}),
  // stock: React.PropTypes.shape({
  //   symbol: React.PropTypes.string,
  // }),
};

StockCell.defaultProps = {
  watchlistResult: [],
  stock: {},
};
