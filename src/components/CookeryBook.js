import React from 'react/addons';
import AltContainer from 'alt-container';
import {Grid, Row, Col} from 'react-bootstrap';
import Recipe from 'components/Recipe';
import BookCover from 'components/BookCover';
import Page from 'components/Page';
//import AddNewTaskForm from 'components/AddNewTaskForm';

require('styles/cookery-book.less');

class CookeryBook extends React.Component {
  constructor(props) {
    super(props);

    this.createPageWithRecipe = this.createPageWithRecipe.bind(this);
  }

  createPageWithRecipe(recipeId) {
    let {recipes} = this.props;
    let recipe = recipes.find(recipe => recipe.get('id') === recipeId);

    return recipe ? (
      <Page key={recipe.get('id')}>
        <Recipe recipe={recipe} />
      </Page>
    ) : null;
  }

  render() {
    let {book} = this.props;
    let recipeId = book.get('actualRecipe');

    return (
      <Grid className="cookery-book">
        <Row>
          {recipeId === null ? (<BookCover />) : this.createPageWithRecipe(recipeId)}
        </Row>
      </Grid>
    );
  }
}

export default CookeryBook;
