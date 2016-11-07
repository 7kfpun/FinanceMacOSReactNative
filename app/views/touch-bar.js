import React, { Component } from 'react';
import {
  Button,
} from 'react-native-macos';

// 3rd party libraries
import { inject, observer } from 'mobx-react/native';
import TouchBar from 'react-native-touchbar';

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
          return (<Button
            key={i}
            title={this.state.withDetails && watchlistResult && watchlistResult[object.symbol] ? `${object.symbol} ${watchlistResult[object.symbol][selectedProperty]}` : object.symbol}
            bezelStyle="rounded"
            onClick={() => setSelectedStock(object)}
          />);
        })}
        <Button
          title={this.state.withDetails ? '🌕' : '🌒'}
          bezelStyle="rounded"
          onClick={() => this.setState({ withDetails: !this.state.withDetails })}
        />
      </TouchBar>
    );
  }
}

MyTouchBar.propTypes = {
  listStore: React.PropTypes.shape({
    watchlist: React.PropTypes.array,
    watchlistResult: React.PropTypes.object,
  }).isRequired,
  selectedStore: React.PropTypes.shape({
    selectedProperty: React.PropTypes.object,
    setSelectedStock: React.PropTypes.object,
  }).isRequired,
};

MyTouchBar.defaultProps = {};
