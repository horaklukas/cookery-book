import React from 'react/addons';
import {Row, Col} from 'react-bootstrap';
import classNames from 'classnames';
import Page from 'components/Page';

require('styles/book-cover.less');

class BookCover extends React.Component {
  render() {
    let coverPageClass = classNames({
      'cover': true,
      'hidden': !this.props.actual
    });

    return (
      <Page type={coverPageClass}>
        {/*<img src="../images/book-cover.jpg" className="img-responsive" />*/}
        <h1>Cookbook</h1>
      </Page>
    );
  }
}

export default BookCover;