import AltInstance from 'lib/AltInstance';

class CookeryBookActions {
  constructor() {
    this.generateActions('setFirstPage', 'setNextPage', 'setPreviousPage',
      'setLastPage', 'setHeight');
  }
}

export default AltInstance.createActions(CookeryBookActions);
