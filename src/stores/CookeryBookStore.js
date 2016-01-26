import ImmutableStore from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

import AltInstance from 'lib/AltInstance';
import Actions from 'actions/RecipesActions';

class CookeryBookStore {
  constructor() {
    this.state = Map({actualRecipe: null});
  }

  setActualRecipe(recipe) {
    return this.setState({actualRecipe: recipe});
  }
}

export default AltInstance.createStore(ImmutableStore(CookeryBookStore));
