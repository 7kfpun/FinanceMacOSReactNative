import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native-macos';

// 3rd party libraries
import { inject, observer } from 'mobx-react/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  nameBlock: {
    flex: 1,
    paddingTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
  },
  details: {
    flex: 5,
    flexDirection: 'column',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
  },
  detailsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsRowColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
  separatorThin: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A6A6A6',
  },
  propertyText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'left',
  },
  valueText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'right',
  },
});

@inject('listStore', 'selectedStore') @observer
export default class DetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeSpan: '1D',
    };
  }

  render() {
    const { watchlistResult } = this.props.listStore;
    const { selectedStock } = this.props.selectedStore;

    return (
      <View style={styles.container}>
        <View style={styles.nameBlock}>
          <Text style={styles.nameText}>
            {(watchlistResult && watchlistResult[selectedStock.symbol] && watchlistResult[selectedStock.symbol].Name) || '--'}
          </Text>
        </View>
        <View style={styles.details}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                OPEN
              </Text>
              <Text style={styles.valueText}>
                {(watchlistResult && watchlistResult[selectedStock.symbol] && watchlistResult[selectedStock.symbol].Open) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                MKT CAP
              </Text>
              <Text style={styles.valueText}>
                {(watchlistResult && watchlistResult[selectedStock.symbol] && watchlistResult[selectedStock.symbol].MarketCapitalization) || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                HIGH
              </Text>
              <Text style={styles.valueText}>
                {(watchlistResult && watchlistResult[selectedStock.symbol] && watchlistResult[selectedStock.symbol].DaysHigh) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                52W HIGH
              </Text>
              <Text style={styles.valueText}>
                {(watchlistResult && watchlistResult[selectedStock.symbol] && watchlistResult[selectedStock.symbol].YearHigh) || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                LOW
              </Text>
              <Text style={styles.valueText}>
                {(watchlistResult && watchlistResult[selectedStock.symbol] && watchlistResult[selectedStock.symbol].DaysLow) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                52W LOW
              </Text>
              <Text style={styles.valueText}>
                {(watchlistResult && watchlistResult[selectedStock.symbol] && watchlistResult[selectedStock.symbol].YearLow) || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                VOL
              </Text>
              <Text style={styles.valueText}>
                {(watchlistResult && watchlistResult[selectedStock.symbol] && watchlistResult[selectedStock.symbol].Volume) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                AVG VOL
              </Text>
              <Text style={styles.valueText}>
                {(watchlistResult && watchlistResult[selectedStock.symbol] && watchlistResult[selectedStock.symbol].AverageDailyVolume) || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                P/E
              </Text>
              <Text style={styles.valueText}>
                {(watchlistResult && watchlistResult[selectedStock.symbol] && watchlistResult[selectedStock.symbol].PERatio) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                YIELD
              </Text>
              <Text style={styles.valueText}>
                {(watchlistResult
                  && watchlistResult[selectedStock.symbol]
                  && watchlistResult[selectedStock.symbol].DividendYield
                  && `${watchlistResult[selectedStock.symbol].DividendYield} %`) || '--'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

DetailsPage.propTypes = {
  listStore: React.PropTypes.shape({
    watchlistResult: React.PropTypes.object,
  }).isRequired,
  selectedStore: React.PropTypes.shape({
    selectedStock: React.PropTypes.object,
  }).isRequired,
};

DetailsPage.defaultProps = {
  watchlistResult: [],
  stock: {},
};
