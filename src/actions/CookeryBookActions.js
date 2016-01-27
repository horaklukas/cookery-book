import AltInstance from 'lib/AltInstance';

class CookeryBookActions {
  constructor() {
    this.generateActions('setNextPage', 'setPreviousPage');
  }
}

export default AltInstance.createActions(CookeryBookActions);
