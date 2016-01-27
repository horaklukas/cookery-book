import React from 'react/addons';
import {Button, Glyphicon} from 'react-bootstrap';

require('styles/browse-button.less');

class BrowseButton extends React.Component {
  render() {
    let {type} = this.props;

    return (
      <Button className="browse-button">
        <Glyphicon glyph={type} />
      </Button>
    );
  }
}

export default BrowseButton;
