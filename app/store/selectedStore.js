import { action, observable } from 'mobx';

const ROTATE_PROPERTIES = {
  Change: 'MarketCapitalization',
  ChangeinPercent: 'Change',
  MarketCapitalization: 'ChangeinPercent',
};

class SelectedStore {
  @observable selectedStock = {};
  @observable selectedProperty = 'ChangeinPercent';

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
  }
}

const selectedStore = new SelectedStore();

export default selectedStore;
export { SelectedStore };
