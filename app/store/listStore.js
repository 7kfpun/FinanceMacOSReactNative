import { ListView } from 'react-native-macos';

// 3rd party libraries
import { action, computed, observable } from 'mobx';
import store from 'react-native-simple-store';

import finance from '../utils/finance';

import selectedStore from './selectedStore';

class WatchlistStore {
  @observable watchlist = [];
  @observable watchlistResult;

  constructor() {
    const defaultWatchlist = [
      { symbol: 'AAPL', share: 100 },
      { symbol: 'FB', share: 100 },
      { symbol: 'GOOG', share: 100 },
    ];

    store.get('watchlist')
      .then((watchlist) => {
        this.watchlist = watchlist && watchlist.length > 0 ? watchlist : defaultWatchlist;
        selectedStore.setSelectedStock(this.watchlist[0]);
      });
    this.getWatchlistResult();
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
    store.save('watchlist', this.watchlist);
  }

  @action removeWatchlistItem (item) {
    console.log('removeWatchlistItem');
    this.watchlist = this.watchlist.filter(element => element.symbol !== item);
    store.save('watchlist', this.watchlist);
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
