import React from 'react/addons';
import {Grid} from 'react-bootstrap';
import Recipe from 'components/Recipe';
import Page from 'components/Page';
import RecipesStore from 'stores/RecipesStore';
import RecipesActions from '../actions/RecipesActions';
//import AddNewTaskForm from 'components/AddNewTaskForm';

require('styles/cookery-book.less');

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
      <Grid className="cookery-book">
        {recipes.map(recipe =>
          <Page key={recipe.get('id')}>
            <Recipe recipe={recipe} />
          </Page>
         ).toJS()}
      </Grid>
    );
  }
}

export default CookeryBook;
