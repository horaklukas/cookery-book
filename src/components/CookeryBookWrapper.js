import React from 'react/addons';
import AltContainer from 'alt-container';
import CookeryBook from './CookeryBook';

import RecipesStore from 'stores/RecipesStore';
import CookeryBookStore from 'stores/CookeryBookStore';
import RecipesActions from '../actions/RecipesActions';

class CookeryBookWrapper extends React.Component {
  componentDidMount() {
    RecipesActions.fetchRecipes();
  }

  render() {
    let stores = {
      recipes: RecipesStore,
      book: CookeryBookStore
    };

    return (
      <AltContainer stores={stores}>
        <CookeryBook />
      </AltContainer>
    );
  }
}

export default CookeryBookWrapper;
