import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  View,
} from 'react-native-macos';

// 3rd party libraries
import { inject, observer } from 'mobx-react/native';
import TouchBar from 'react-native-touchbar';

const styles = StyleSheet.create({
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
export default class MyTouchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      withDetails: true,
    };
  }

  render() {
    const { watchlist, watchlistResult } = this.props.listStore;
    const { selectedProperty, setSelectedStock } = this.props.selectedStore;

    return (
      <TouchBar>
        {watchlist.map((object, i) => {
          return <Button
            key={i}
            title={this.state.withDetails && watchlistResult && watchlistResult[object.symbol] ? `${object.symbol} ${watchlistResult[object.symbol][selectedProperty]}`: object.symbol}
            bezelStyle="rounded"
            onClick={() => setSelectedStock(object)} />
          })}
        <Button
          title={this.state.withDetails ? "🌕" : "🌒"}
          bezelStyle="rounded"
          onClick={() => this.setState({ withDetails: !this.state.withDetails })} />
      </TouchBar>
    );
  }
}

MyTouchBar.propTypes = {};

MyTouchBar.defaultProps = {};
