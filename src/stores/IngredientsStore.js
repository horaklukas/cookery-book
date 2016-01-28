import AltInstance from 'lib/AltInstance';
import Immutable from 'immutable';
import ImmutableStore from 'alt/utils/ImmutableUtil';
import Actions from 'actions/IngredientsActions';

export class UnwrappedIngredientsStore {
  constructor() {
    this.state = Immutable.List();

    this.bindActions(Actions);
    this.exportPublicMethods({getIngredientById: this.getIngredientById});
  }

  onSetIngredients(ingredients) {
    return this.setState(ingredients);
  }

  getIngredientById(id) {
    let ingredient =  this.getState().find(ingred => ingred.get('id') === id);

    return ingredient ? ingredient : null;
  }
}

export default AltInstance.createStore(
  ImmutableStore(UnwrappedIngredientsStore), 'IngredientsStore'
);
