import React from 'react/addons';
import AltContainer from 'alt-container';
import {Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';
import classNames from 'classnames';
import _forEach from 'lodash.foreach';

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

  componentDidUpdate() {
    var heights = [];
    let pages = document.querySelectorAll('.page');

    _forEach(pages, page => heights.push(page.clientHeight));

    if(this.props.book.get('height') === null) {
      // async call to prevent "Cannot dispatch in the middle of dispatching" error
      setTimeout(() => CookeryBookActions.setHeight(Math.max(...heights)), 0);
    }
  }

  handleFastBackward() { CookeryBookActions.setFirstPage(); }
  handleBackward() { CookeryBookActions.setPreviousPage(); }
  handleForward() { CookeryBookActions.setNextPage(); }
  handleFastForward() { CookeryBookActions.setLastPage(); }

  createPageWithRecipe(recipe) {
    let actualRecipeId = this.props.book.get('actualRecipe');

    // don't hide inactive pages until book height is counted 
    let pageClass = classNames({
      'hidden': this.props.book.get('height') !== null && actualRecipeId !== recipe.get('id')
    });

    return (
      <Page key={recipe.get('id')} type={pageClass}>
        <Recipe recipe={recipe} />
      </Page>
    );
  }

  render() {
    let {book, recipes} = this.props;
    let lastRecipe = recipes.last();
    let recipeId = book.get('actualRecipe');
    let backwardButtons = null;
    let forwardButtons = null;
    let bookHeight = book.get('height');
    let browseButtonColStyles = null;

    if(bookHeight !== null) {
      browseButtonColStyles = {
        height: bookHeight,
        // 80px is height of browse button, its defined inside variables.less
        // TODO - find how to share button height variable with styles
        paddingTop: (bookHeight - (80 * 2)) / 2
      }; 
    }

    if(recipeId !== null) {
      backwardButtons = (
        <div className="browse-buttons">
          <BrowseButton type="backward" onClick={this.handleBackward} />
          <BrowseButton type="fast-backward" onClick={this.handleFastBackward} />
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
          <Col xs={1} className="backward" style={browseButtonColStyles}>
            {backwardButtons}
          </Col>
          <Col xs={10} className="book" style={{height: bookHeight}}>
            <BookCover actual={recipeId === null} />
            {recipes.map(this.createPageWithRecipe)}
          </Col>
          <Col xs={1} className="forward" style={browseButtonColStyles}>
            {forwardButtons}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default CookeryBook;
