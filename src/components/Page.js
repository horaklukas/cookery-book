import React from 'react/addons';
import {Row, Col} from 'react-bootstrap';

require('styles/page.less');

class Page extends React.Component {
  render() {
    return (
      <Row className="page">
        <Col xs={12} className="content">
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

export default Page;