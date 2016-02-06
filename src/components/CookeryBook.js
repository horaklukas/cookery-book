import React from 'react/addons';
import {Grid, Row, Col} from 'react-bootstrap';
import _upperFirst from 'lodash.upperfirst';

import Recipes from 'components/Recipes';
import BookCover from 'components/BookCover';
import BrowseButton from 'components/BrowseButton';

import CookeryBookActions from '../actions/CookeryBookActions';

require('styles/cookery-book.less');

class CookeryBook extends React.Component {
  handleFastBackward() { CookeryBookActions.setFirstPage(); }
  handleBackward() { CookeryBookActions.setPreviousPage(); }
  handleForward() { CookeryBookActions.setNextPage(); }
  handleFastForward() { CookeryBookActions.setLastPage(); }

  createBrowseButtons(type) {
    let fastType =  `fast-${type}`;
    let typeUpper = _upperFirst(type);

    return (
      <div className="browse-buttons">
        <BrowseButton type={type} onClick={this[`handle${typeUpper}`]} />
        <BrowseButton type={fastType} onClick={this[`handleFast${typeUpper}`]} />
      </div>
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
      backwardButtons = this.createBrowseButtons('backward');
    }

    if(lastRecipe && lastRecipe.get('id') !== recipeId) {
      forwardButtons = this.createBrowseButtons('forward');
    }

    return (
      <Grid className="cookery-book">
        <Row>
          <Col xs={1} className="backward" style={browseButtonColStyles}>
            {backwardButtons}
          </Col>
          <Col xs={10} className="book" style={{height: bookHeight}}>
            <BookCover actual={recipeId === null} />
            <Recipes {...this.props} />
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
