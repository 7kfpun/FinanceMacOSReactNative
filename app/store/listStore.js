import { action, computed, observable } from 'mobx';

import { ListView } from 'react-native';

import finance from '../utils/finance';

import selectedStore from './selectedStore';

class WatchlistStore {
  @observable watchlist;
  @observable watchlistResult;

  constructor() {
    this.watchlist = [
      { symbol: 'AAPL', share: 100 },
      { symbol: 'FB', share: 100 },
      { symbol: 'GOOG', share: 100 },
    ];
    this.getWatchlistResult();
    selectedStore.setSelectedStock(this.watchlist[0]);
  }

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  @computed get dataSource() {
    return this.ds.cloneWithRows(this.watchlist.slice());
  }

  @action setWatchlist = (watchlist) => {
    this.watchlist = watchlist;
  }

  addItem (item) {
    this.watchlist.push({
      symbol: item,
    });
    this.getWatchlistResult();
  }

  removeListItem (item) {
    this.list = this.list.filter((l) => {
      return l.index !== item.index
    })
  }

  @action getWatchlistResult() {
    const that = this;
    finance.getStock({ stock: this.watchlist.map(item => item.symbol) }, 'quotes')
      .then(response => response.json())
      .then((json) => {
        let quotes = json.query.results.quote;
        quotes = Array.isArray(quotes) ? quotes : [quotes];

        const watchlistResult = {};
        quotes.forEach((quote) => {
          watchlistResult[quote.symbol] = quote;
        });
        // store.save('watchlistResult', watchlistResult);
        console.log('watchlistResult', watchlistResult);

        that.watchlistResult = watchlistResult;
      }).catch((error) => {
        console.log('Request failed', error);
      });
  }
}

const watchlistStore = new WatchlistStore();

export default watchlistStore;
export { WatchlistStore };
