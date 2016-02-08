import React from 'react/addons';
import {Row, Col} from 'react-bootstrap';
import classNames from 'classnames';

require('styles/page.less');

class Page extends React.Component {
  render() {
    let {type, header} = this.props;
    let pageClass = classNames({
      "page": true,
      [type]: type !== null && type !== undefined
    });

    let headerComponent = header !== null && header !== undefined? 
      <Col xs={12} className="header">{header}</Col> : null;

    return (
      <Row className={pageClass}>
        {headerComponent}
        <Col xs={12} className="content">
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

export default Page;