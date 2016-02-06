import React from 'react/addons';
import classNames from 'classnames';
import _forEach from 'lodash.foreach';

import Recipe from 'components/Recipe';
import Page from 'components/Page';

import CookeryBookActions from '../actions/CookeryBookActions';

require('styles/cookery-book.less');

class Recipes extends React.Component {
  constructor(props) {
    super(props);

    this.createPageWithRecipe = this.createPageWithRecipe.bind(this);
  }

  componentDidUpdate() {
    var heights = [Math.round(window.innerHeight * 0.95)];

    let pages = document.querySelectorAll('.page');

    _forEach(pages, page => heights.push(page.offsetHeight));

    if(this.props.book.get('height') === null) {
      // async call to prevent "Cannot dispatch in the middle of dispatching" error
      setTimeout(() => CookeryBookActions.setHeight(Math.max(...heights)), 0);
    }
  }

  createPageWithRecipe(recipe, index, recipes) {
    let actualRecipeId = this.props.book.get('actualRecipe');
    let headerText = `${index + 1} / ${recipes.size}`;

    // don't hide inactive pages until book height is counted 
    let pageClass = classNames({
      'hidden': this.props.book.get('height') !== null && 
        actualRecipeId !== recipe.get('id')
    });

    return (
      <Page key={recipe.get('id')} type={pageClass} header={headerText}>
        <Recipe recipe={recipe} />
      </Page>
    );
  }

  render() {
    return (
      <div className="recipes">
        {this.props.recipes.map(this.createPageWithRecipe)}
      </div>
    );
  }
}

export default Recipes;
