import React from 'react/addons';
import {Row, Col} from 'react-bootstrap';
import classNames from 'classnames';

require('styles/page.less');

class Page extends React.Component {
  render() {
    let {type} = this.props;
    let pageClass = classNames({
      "page": true,
      [type]: type !== null && type !== undefined
    });

    return (
      <Row className={pageClass}>
        <Col xs={12} className="content">
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

export default Page;