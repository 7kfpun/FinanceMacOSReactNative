import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native-macos';

// 3rd party libraries
import { inject, observer } from 'mobx-react/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selected: {
    backgroundColor: '#202020',
  },
  symbol: {
    flex: 3,
  },
  symbolText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  price: {
    flex: 2,
  },
  priceText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  changeRed: {
    backgroundColor: '#FC3D39',
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeGreen: {
    backgroundColor: '#53D769',
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

@inject('listStore', 'selectedStore') @observer
export default class StockCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStock: {},
    };
  }

  render() {
    const { watchlistResult } = this.props.listStore;
    const { selectedStock, selectedProperty, setSelectedStock, rotateSelectedProperty } = this.props.selectedStore;

    console.log(selectedStock.symbol, this.props.stock.symbol, selectedStock.symbol === this.props.stock.symbol);
    return (
      <TouchableHighlight
        style={[selectedStock.symbol === this.props.stock.symbol ? styles.selected : null]}
        onPress={() => setSelectedStock(this.props.stock)} underlayColor="#202020"
      >
        <View style={[styles.container, selectedStock.symbol === this.props.stock.symbol ? styles.selected : null]}>
          <View style={styles.symbol}>
            <Text style={styles.symbolText}>
              {this.props.stock.symbol}
            </Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceText}>
              {watchlistResult && watchlistResult[this.props.stock.symbol] && watchlistResult[this.props.stock.symbol].LastTradePriceOnly}
            </Text>
          </View>
          <TouchableHighlight
            style={(() => {
              switch (watchlistResult
                      && watchlistResult[this.props.stock.symbol]
                      && watchlistResult[this.props.stock.symbol].Change
                      && watchlistResult[this.props.stock.symbol].Change.startsWith('+')) {
                case true: return styles.changeGreen;
                case false: return styles.changeRed;
                default: return styles.changeGreen;
              }
            })()}
            underlayColor={(() => {
              switch (watchlistResult
                      && watchlistResult[this.props.stock.symbol]
                      && watchlistResult[this.props.stock.symbol].Change
                      && watchlistResult[this.props.stock.symbol].Change.startsWith('+')) {
                case true: return '#53D769';
                case false: return '#FC3D39';
                default: return '#53D769';
              }
            })()}
            onPress={() => rotateSelectedProperty()}
          >
            <View>
              <Text style={styles.changeText}>
                {(() => {
                  switch (selectedProperty) {
                    case 'Change': return (
                      watchlistResult
                      && watchlistResult[this.props.stock.symbol]
                      && watchlistResult[this.props.stock.symbol].Change) || '--';
                    case 'ChangeinPercent': return (
                      watchlistResult
                      && watchlistResult[this.props.stock.symbol]
                      && watchlistResult[this.props.stock.symbol].ChangeinPercent) || '--';
                    case 'MarketCapitalization': return (
                      watchlistResult
                      && watchlistResult[this.props.stock.symbol]
                      && watchlistResult[this.props.stock.symbol].MarketCapitalization) || '--';
                    default: return (
                      watchlistResult
                      && watchlistResult[this.props.stock.symbol]
                      && watchlistResult[this.props.stock.symbol].Change) || '--';
                  }
                })()}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    );
  }
}

StockCell.propTypes = {
  watchlistResult: React.PropTypes.shape({}),
  stock: React.PropTypes.shape({
    symbol: React.PropTypes.string,
  }),
  selectedStock: React.PropTypes.shape({
    symbol: React.PropTypes.string,
  }),
  selectedProperty: React.PropTypes.string,
};

StockCell.defaultProps = {
  watchlistResult: [],
  stock: {},
};
