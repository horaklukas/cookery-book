import AltInstance from 'lib/AltInstance';
import IngredientsSource from '../sources/IngredientsSource';

class IngredientsActions {
  constructor() {
    this.generateActions('setIngredients');
  }

  fetchIngredients() {
    IngredientsSource.fetch()
      .then(this.actions.setIngredients)
      .catch((errorMessage) => {
        console.warn('Error message');
      });
  }

}

export default AltInstance.createActions(IngredientsActions);
