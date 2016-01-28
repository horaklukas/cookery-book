import React from 'react/addons';
import {Row, Col} from 'react-bootstrap';

require('styles/recipe.less');

class Recipe extends React.Component {
  constructor(props) {
    super(props);
  }

  createIngredient(ingredient) {
    let name = ingredient.get('name'),
      amount = ingredient.get('amount');

    return (<span key={name} className="ingredient">{name} {amount}</span>);
  }

  render() {
    let {recipe} = this.props;
    let ingredients = recipe.get('ingredients').map(this.createIngredient);

    return (
      <Row className="recipe" fluid={true}>
        <h2>{recipe.get('title')}</h2>
        <p className="ingredients">
          {ingredients.toJS()}
        </p>
        <p>{recipe.get('description')}</p>
      </Row>
    );
  }
}

export default Recipe;