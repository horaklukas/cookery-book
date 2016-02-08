import React from 'react/addons';
import {Row, Col} from 'react-bootstrap';
import IngredientsStore from 'stores/IngredientsStore';

require('styles/recipe.less');

class Recipe extends React.Component {
  constructor(props) {
    super(props);
  }

  createIngredient(recipeIngredient) {
    let name,
      id = recipeIngredient.get('id'),
      amount = recipeIngredient.get('amount'),
      ingredientInfo = IngredientsStore.getIngredientById(id);

    name = ingredientInfo ? ingredientInfo.get('name') : null;

    return (<span key={id} className="ingredient">{name} {amount}</span>);
  }

  render() {
    let {recipe} = this.props;
    let ingredients = recipe.get('ingredients');

    let ingredientsList = ingredients ?
      ingredients.map(this.createIngredient).toJS() : null;

    return (
      <Row className="recipe" fluid={true}>
        <h2>{recipe.get('title')}</h2>
        <p className="ingredients">
          {ingredientsList}
        </p>
        <p>{recipe.get('description')}</p>
      </Row>
    );
  }
}

export default Recipe;