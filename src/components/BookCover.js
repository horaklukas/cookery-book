import React from 'react/addons';
import {Row, Col} from 'react-bootstrap';

require('styles/book-cover.less');

class BookCover extends React.Component {
  render() {
    return (
      <Row className="cover">
        <Col xs={12}>
          <img src="../images/book-cover.jpg" className="img-responsive" />
        </Col>
      </Row>
    );
  }
}

export default BookCover;