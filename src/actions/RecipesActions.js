import UUID        from 'node-uuid';
import AltInstance from 'lib/AltInstance';

import RecipesSource from '../sources/RecipesSource';

class RecipesActions {
  constructor() {
    this.generateActions('setRecipes');
  }

  fetchRecipes() {
    RecipesSource.fetch()
      .then(this.actions.setRecipes)
      .catch((errorMessage) => {
        console.warn('Error message');
      });
  }
  //addTask(content) { this.dispatch(Immutable.fromJS({ id: UUID.v4(), content })); }
  //removeTask(taskID) { this.dispatch(taskID); }
}

export default AltInstance.createActions(RecipesActions);
