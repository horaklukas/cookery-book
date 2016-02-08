import React from 'react/addons';
import AltContainer from 'alt-container';
import CookeryBook from './CookeryBook';

import RecipesStore from 'stores/RecipesStore';
import CookeryBookStore from 'stores/CookeryBookStore';
import IngredientsStore from 'stores/IngredientsStore';
import RecipesActions from '../actions/RecipesActions';
import IngredientsActions from '../actions/IngredientsActions';

class CookeryBookWrapper extends React.Component {
  componentDidMount() {
    RecipesActions.fetchRecipes();
    IngredientsActions.fetchIngredients();
  }

  render() {
    let stores = {
      recipes: RecipesStore,
      book: CookeryBookStore,
      ingredients: IngredientsStore
    };

    return (
      <AltContainer stores={stores}>
        <CookeryBook />
      </AltContainer>
    );
  }
}

export default CookeryBookWrapper;
