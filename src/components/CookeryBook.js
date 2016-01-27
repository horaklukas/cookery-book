import React from 'react/addons';
import AltContainer from 'alt-container';
import {Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';

import Recipe from 'components/Recipe';
import BookCover from 'components/BookCover';
import Page from 'components/Page';
import BrowseButton from 'components/BrowseButton';

import CookeryBookActions from '../actions/CookeryBookActions';

require('styles/cookery-book.less');

class CookeryBook extends React.Component {
  constructor(props) {
    super(props);

    this.createPageWithRecipe = this.createPageWithRecipe.bind(this);
  }

  handleBackward() { CookeryBookActions.setPreviousPage(); }
  handleForward() { CookeryBookActions.setNextPage(); }

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
    let {book, recipes} = this.props;
    let lastRecipe = recipes.last();
    let recipeId = book.get('actualRecipe');

    let backwardButton = recipeId !== null ?
      <BrowseButton type="backward" onClick={this.handleBackward} /> : null;

    let forwardButton = lastRecipe && lastRecipe.get('id') !== recipeId ?
      <BrowseButton type="forward" onClick={this.handleForward} /> : null;

    return (
      <Grid className="cookery-book">
        <Row>
          <Col xs={1}>{backwardButton}</Col>
          <Col xs={10}>
          {recipeId === null ? (<BookCover />) : this.createPageWithRecipe(recipeId)}
          </Col>
          <Col xs={1}>{forwardButton}</Col>
        </Row>
      </Grid>
    );
  }
}

export default CookeryBook;
