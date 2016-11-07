import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native-macos';

// 3rd party libraries
import { inject, observer } from 'mobx-react/native';

import { nativeHistory } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 65,
    backgroundColor: 'black',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
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
});

@inject('listStore') @observer
export default class StockCell extends React.Component {
  onPressAdd(symbol) {
    console.log('_onPressAdd', symbol);
    this.props.listStore.addItem(symbol);
    nativeHistory.goBack();
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.onPressAdd(this.props.stock.symbol)} underlayColor="#202020">
        <View style={styles.container}>
          <View style={styles.stock}>
            <View style={styles.symbol}>
              <Text style={styles.symbolText}>
                {this.props.stock.symbol}
              </Text>
              <Text style={styles.marketText}>
                {this.props.stock.exchDisp}
              </Text>
            </View>
            <View style={styles.name}>
              <Text style={styles.nameText}>
                {this.props.stock.name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

StockCell.propTypes = {
  stock: React.PropTypes.shape({
    symbol: React.PropTypes.string,
    exchDisp: React.PropTypes.string,
    name: React.PropTypes.string,
  }),
  listStore: React.PropTypes.shape({
    addItem: React.PropTypes.func,
  }).isRequired,
};

StockCell.defaultProps = {
  stock: {},
};
