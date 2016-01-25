import React from 'react/addons';
import {ListGroupItem} from 'react-bootstrap';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { recipe } = this.props;

    return (
      <ListGroupItem>
        {recipe.get('title')}
      </ListGroupItem>
    );
}
}

export default Recipe;

