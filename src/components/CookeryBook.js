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

  handleFastBackward() { CookeryBookActions.setFirstPage(); }
  handleBackward() { CookeryBookActions.setPreviousPage(); }
  handleForward() { CookeryBookActions.setNextPage(); }
  handleFastForward() { CookeryBookActions.setLastPage(); }

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
    let backwardButtons = null;
    let forwardButtons = null;

    if(recipeId !== null) {
      backwardButtons = (
        <div className="browse-buttons">
          <BrowseButton type="fast-backward" onClick={this.handleFastBackward} />
          <BrowseButton type="backward" onClick={this.handleBackward} />
        </div>
      );
    }

    if(lastRecipe && lastRecipe.get('id') !== recipeId) {
      forwardButtons = (
        <div className="browse-buttons">
          <BrowseButton type="forward" onClick={this.handleForward} />
          <BrowseButton type="fast-forward" onClick={this.handleFastForward} />
        </div>
      );
    }

    return (
      <Grid className="cookery-book">
        <Row>
          <Col xs={1}>{backwardButtons}</Col>
          <Col xs={10}>
          {recipeId === null ? (<BookCover />) : this.createPageWithRecipe(recipeId)}
          </Col>
          <Col xs={1}>{forwardButtons}</Col>
        </Row>
      </Grid>
    );
  }
}

export default CookeryBook;
