import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native-macos';
import { inject, observer } from 'mobx-react/native';
import { Link, nativeHistory } from 'react-router-native';

// View Elements
import StockCell from './elements/stock-cell';  // eslint-disable-line import/no-named-as-default,import/no-named-as-default-member

import TouchBar from '../touch-bar';  // eslint-disable-line import/no-named-as-default,import/no-named-as-default-member

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  statusBar: {
    height: 22,
    backgroundColor: '#202020',
  },
  navigatorBar: {
    height: 36,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#202020',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#424242',
  },
  topBlock: {
    flex: 1,
  },
  bottomBlock: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonLeft: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth * 2,
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
  },
  buttonMiddle: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth * 2,
    flex: 1,
    justifyContent: 'center',
  },
  buttonRight: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth * 2,
    flex: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center',
  },
  buttonSelected: {
    backgroundColor: '#3CABDA',
  },
  buttonText: {
    fontSize: 14,
    color: '#3CABDA',
    alignSelf: 'center',
  },
  buttonTextSelected: {
    color: 'black',
  },
  text: {
    fontSize: 15,
    color: '#3CABDA',
  },
});

@inject('listStore', 'selectedStore') @observer
export default class SettingsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      watchlist: props.listStore.watchlist.map(item => Object.assign({}, { symbol: item.symbol })),
    };
  }

  componentDidMount() {
    this.prepareRows();
  }

  prepareRows() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.watchlist),
      key: Math.random(),
    });
  }

  renderToolbar() {
    return (
      <View>
        <TouchBar />
        <View style={styles.statusBar} />
        <View style={styles.navigatorBar}>
          <Link to={'add'} underlayColor="#202020">
            <Text style={styles.text}>
              +
            </Text>
          </Link>
          <Text style={styles.text}>
            {this.props.title}
          </Text>
          <TouchableHighlight underlayColor="#202020" onPress={nativeHistory.goBack}>
            <Text style={styles.text}>
              Done
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    const { watchlistResult } = this.props.listStore;
    const { selectedProperty, setSelectedProperty } = this.props.selectedStore;

    return (
      <View style={styles.container}>
        {this.renderToolbar()}
        <View style={styles.topBlock}>
          <ListView
            key={this.state.key}
            dataSource={this.state.dataSource}
            renderRow={stock => <StockCell stock={stock} watchlistResult={watchlistResult} />}
            enableEmptySections
          />
        </View>
        <View style={styles.bottomBlock}>
          <TouchableHighlight
            style={[styles.buttonLeft, selectedProperty === 'ChangeinPercent' ? styles.buttonSelected : null]}
            underlayColor="#66CCFF"
            onPress={() => setSelectedProperty('ChangeinPercent')}
          >
            <Text style={[styles.buttonText, selectedProperty === 'ChangeinPercent' ? styles.buttonTextSelected : null]}>
              percentage
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonMiddle, selectedProperty === 'Change' ? styles.buttonSelected : null]}
            underlayColor="#66CCFF"
            onPress={() => setSelectedProperty('Change')}
          >
            <Text style={[styles.buttonText, selectedProperty === 'Change' ? styles.buttonTextSelected : null]}>
              price
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonRight, selectedProperty === 'MarketCapitalization' ? styles.buttonSelected : null]}
            underlayColor="#66CCFF"
            onPress={() => setSelectedProperty('MarketCapitalization')}
          >
            <Text style={[styles.buttonText, selectedProperty === 'MarketCapitalization' ? styles.buttonTextSelected : null]}>
              market cap
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

SettingsView.propTypes = {
  title: React.PropTypes.string,
  listStore: React.PropTypes.shape({
    watchlist: React.PropTypes.array,
    watchlistResult: React.PropTypes.object,
  }).isRequired,
  selectedStore: React.PropTypes.shape({
    selectedProperty: React.PropTypes.object,
    setSelectedProperty: React.PropTypes.func,
  }).isRequired,
};

SettingsView.defaultProps = {
  title: '',
};
