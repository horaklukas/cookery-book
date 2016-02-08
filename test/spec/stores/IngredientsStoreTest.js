'use strict';

import alt from 'lib/AltInstance';
import AltTestingUtils from 'alt/utils/AltTestingUtils';
import {fromJS} from 'immutable';
import Actions from 'actions/CookeryBookActions';

describe('IngredientsStore', function() {
  let wrappedIngredientsStore, unwrappedStore;

  beforeAll(function() {
    let WrappedIngredientsStore = require('stores/IngredientsStore');
    wrappedIngredientsStore = WrappedIngredientsStore.default;
    let {UnwrappedIngredientsStore} = WrappedIngredientsStore;
    unwrappedStore = AltTestingUtils.makeStoreTestable(alt, UnwrappedIngredientsStore);

    let ingredients = [
      {id: 'i1', title: 'ingredient1'}, {id: 'i2',  title: 'ingredient2'},
      {id: 'i3',  title: 'ingredient3'}, {id: 'i4',  title: 'ingredient4'}
    ];

    alt.bootstrap(JSON.stringify({IngredientsStore: ingredients}));
  });

  describe('#getIngredientById', function() {
    it('should return ingredient when found', function() {
      expect(wrappedIngredientsStore.getIngredientById('i2').toJS()).toEqual({
        id: 'i2', title: 'ingredient2'
      });
    });

    it('should return null when ingredient not found', function() {
      expect(wrappedIngredientsStore.getIngredientById('i5')).toBeNull();
    });
  });

});