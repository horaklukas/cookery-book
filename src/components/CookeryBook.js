import React from 'react/addons';
import { Grid, Row, ListGroup } from 'react-bootstrap';
import RecipesStore from 'stores/RecipesStore';
import Recipe from 'components/Recipe';
import RecipesActions from '../actions/RecipesActions';
//import AddNewTaskForm from 'components/AddNewTaskForm';

class CookeryBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipes: RecipesStore.getState() };
    this.recipesChanged = this.recipesChanged.bind(this);
  }

  componentDidMount() {
    RecipesStore.listen(this.recipesChanged);
    RecipesActions.fetchRecipes();
  }

  componentWillUnmount() {
    RecipesStore.unlisten(this.recipesChanged);
  }

  recipesChanged(recipesList)  {
    this.setState({ recipes: recipesList });
  }

  render() {
    let {recipes} = this.state;

    return (
      <Grid>
        <Row fluid={true}>
          <h1>Recipes:</h1>
          <ListGroup>
            {recipes.map(recipe =>
              <Recipe key={recipe.get('id')} recipe={recipe} />
             ).toJS()}
          </ListGroup>
          {/*<h2>Add new recipe:</h2>
          <AddNewTaskForm />*/}
        </Row>
      </Grid>
    );
  }
}

export default CookeryBook;
