'use strict';

import alt from 'lib/AltInstance';
import AltTestingUtils from 'alt/utils/AltTestingUtils';
import {fromJS} from 'immutable';
import rewire from 'rewire';
import Actions from 'actions/CookeryBookActions';

describe('CookeryBookStore', function() {
  let wrappedCookeryBookStore, unwrappedStore;


  beforeAll(function() {
    let WrappedCookeryBookStore = rewire('stores/CookeryBookStore');
    wrappedCookeryBookStore = WrappedCookeryBookStore.default;
    let {UnwrappedCookeryBookStore} = WrappedCookeryBookStore;
    unwrappedStore = AltTestingUtils.makeStoreTestable(alt, UnwrappedCookeryBookStore);

    this.recipesStoreMock = {getState: jasmine.createSpy().and.returnValue(
      fromJS([
        {id: 'r1', title: 'recipe1'}, {id: 'r2',  title: 'recipe2'},
        {id: 'r3',  title: 'recipe3'}, {id: 'r4',  title: 'recipe4'}
      ])
    )};

    this.setStoreState = function (state) {
      alt.bootstrap(JSON.stringify({CookeryBookStore: state}));
    }

    WrappedCookeryBookStore.__set__('RecipesStore', this.recipesStoreMock);
  });

  it('should set first page for setNextPage action at cover', function() {
    let action = Actions.SET_NEXT_PAGE;
    this.setStoreState({actualRecipe: null});

    alt.dispatcher.dispatch({action});

    expect(wrappedCookeryBookStore.getState().get('actualRecipe')).toEqual('r1');
  });

  it('should set next page id for setNextPage action', function() {
    let action = Actions.SET_NEXT_PAGE;
    this.setStoreState({actualRecipe: 'r2'});

    alt.dispatcher.dispatch({action});

    expect(wrappedCookeryBookStore.getState().get('actualRecipe')).toEqual('r3');
  });

  it('should set previous page id for setPreviousPage action', function() {
    let action = Actions.SET_PREVIOUS_PAGE;
    this.setStoreState({actualRecipe: 'r3'});

    alt.dispatcher.dispatch({action});

    expect(wrappedCookeryBookStore.getState().get('actualRecipe')).toEqual('r2');
  });

  it('should set no page for setPreviousPage action at first recipe', function() {
    let action = Actions.SET_PREVIOUS_PAGE;
    this.setStoreState({actualRecipe: 'r1'});

    alt.dispatcher.dispatch({action});

    expect(wrappedCookeryBookStore.getState().get('actualRecipe')).toBeNull();
  });
});