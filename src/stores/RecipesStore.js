import ImmutableStore from 'alt/utils/ImmutableUtil';
import {List} from 'immutable';

import AltInstance from 'lib/AltInstance';
import Actions from 'actions/RecipesActions';

class RecipesStore {
  constructor() {
    let {setRecipes} = Actions;

    this.bindListeners({
      setRecipes: setRecipes
    });

    this.state = List();
  }

  setRecipes(recipes) {
    return this.setState(recipes);
  }
}

export default AltInstance.createStore(ImmutableStore(RecipesStore));
