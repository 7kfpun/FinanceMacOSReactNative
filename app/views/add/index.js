import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native-macos';

// 3rd party libraries
import { nativeHistory } from 'react-router-native';

// Elements
import StockCell from './elements/stock-cell';  // eslint-disable-line import/no-named-as-default,import/no-named-as-default-member

// Utils
import finance from '../../utils/finance';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  statusBar: {
    height: 22,
  },
  topBlock: {
    backgroundColor: '#202020',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  helpText: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
  },
  searchBar: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    paddingRight: 5,
  },
  searchBarInput: {
    flex: 4,
    flexDirection: 'column',
    height: 30,
    backgroundColor: '#424242',
    borderRadius: 4,
    color: 'white',
    paddingLeft: 10,
  },
  clearIcon: {
    paddingLeft: 2,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#3CABDA',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 4,
  },
  suggestion: {
    flex: 10,
    paddingHorizontal: 15,
  },
});

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      loaded: false,
      text: null,
      helpText: 'Type a company name or stock symbol.',
    };
  }

  onTyping(text) {
    this.setState({
      text: text.text || '',
      helpText: 'Validating symbol...',
    });

    const that = this;
    finance.symbolSuggest(text.text)
      .then(response => response.text())
      .then((result) => {
        const tempResult = result.replace(/(YAHOO\.util\.ScriptNodeDataSource\.callbacks\()(.*)(\);)/g, '$2');
        console.log(tempResult);
        return JSON.parse(tempResult);
      })
      .then((json) => {
        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(json.ResultSet.Result),
          loaded: true,
          helpText: 'Type a company name or stock symbol.',
        });
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View style={styles.topBlock}>
          <Text style={styles.helpText}>
            {this.state.helpText}
          </Text>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchBarInput}
              autoCapitalize={'characters'}
              autoFocus={true}
              placeholder="Search"
              placeholderTextColor="gray"
              onChangeText={text => this.onTyping({ text })}
              value={this.state.text}
            />
            <TouchableHighlight underlayColor="#202020" onPress={nativeHistory.goBack}>
              <Text style={styles.text}>
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.suggestion}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={stock => <StockCell stock={stock} watchlistCache={this.state.watchlistCache} />}
            enableEmptySections
          />
        </View>
      </View>
    );
  }
}
