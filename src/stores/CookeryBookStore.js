import ImmutableStore from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

import AltInstance from 'lib/AltInstance';
import Actions from 'actions/CookeryBookActions';
import RecipesStore from 'stores/RecipesStore';

export class UnwrappedCookeryBookStore {
  constructor() {
    this.state = Map({actualRecipe: null});

    this.bindActions(Actions);
  }

  _setActualRecipe(recipe) {
    return this.setState(this.state.set('actualRecipe', recipe));
  }

  onSetNextPage() {
    var recipeId;
    let actualRecipe = this.state.get('actualRecipe');
    let recipes = RecipesStore.getState();

    if(actualRecipe === null) {
      recipeId = recipes.first().get('id');
    } else {
      let actualIndex = recipes.findIndex(recipe => recipe.get('id') === actualRecipe);

      recipeId = ~actualIndex ? recipes.getIn([actualIndex + 1, 'id']) : actualRecipe;
    }

    return this._setActualRecipe(recipeId);
  }

  onSetPreviousPage() {
    var recipeId;
    let actualRecipe = this.state.get('actualRecipe');
    let recipes = RecipesStore.getState();
    let firstRecipeId = recipes.getIn([0, 'id']);

    if(firstRecipeId === actualRecipe) {
      recipeId = null;
    } else {
      let actualIndex = recipes.findIndex(recipe => recipe.get('id') === actualRecipe);

      recipeId = ~actualIndex ? recipes.getIn([actualIndex - 1, 'id']) : actualRecipe;
    }

    return this._setActualRecipe(recipeId);
  }
}

export default AltInstance.createStore(
  ImmutableStore(UnwrappedCookeryBookStore), 'CookeryBookStore'
);
