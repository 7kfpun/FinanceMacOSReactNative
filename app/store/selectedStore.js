import { ListView } from 'react-native-macos';

// 3rd party libraries
import { action, computed, observable } from 'mobx';

import rss from '../utils/rss';

const ROTATE_PROPERTIES = {
  Change: 'MarketCapitalization',
  ChangeinPercent: 'Change',
  MarketCapitalization: 'ChangeinPercent',
};

class SelectedStore {
  @observable selectedStock = {};
  @observable selectedProperty = 'ChangeinPercent';

  @observable newslist = [];

  @action setSelectedProperty = (selectedProperty) => {
    console.log('setSelectedProperty', selectedProperty);
    this.selectedProperty = selectedProperty;
  }

  @action rotateSelectedProperty = () => {
    console.log('rotateSelectedProperty', ROTATE_PROPERTIES[this.selectedProperty]);
    this.selectedProperty = ROTATE_PROPERTIES[this.selectedProperty];
  }

  @action setSelectedStock = (selectedStock) => {
    this.selectedStock = selectedStock;
    this.getNewsList();
  }

  @action getNewsList() {
    const that = this;
    rss(`https://feeds.finance.yahoo.com/rss/2.0/headline?s=${this.selectedStock.symbol}&region=US&lang=en-US`)
      .then((json) => {
        console.log('getNewsList', json);
        that.newslist = json.query.results.item;
      });
  }

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  @computed get newsDataSource() {
    return this.ds.cloneWithRows(this.newslist.slice());
  }
}

const selectedStore = new SelectedStore();

export default selectedStore;
export { SelectedStore };
