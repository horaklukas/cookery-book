import React from 'react/addons';
import {Button, Glyphicon} from 'react-bootstrap';

require('styles/browse-button.less');

class BrowseButton extends React.Component {
  render() {
    let {type, onClick} = this.props;

    return (
      <Button className="browse-button" onClick={onClick}>
        <Glyphicon glyph={type} />
      </Button>
    );
  }
}

export default BrowseButton;
