'use strict';

import {fromJS} from 'immutable';
import ingredients from '../data/ingredients';

var IngredientsSource = {
  fetch: function () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(fromJS(ingredients));
      }, 250);
    });
  }
};

export default IngredientsSource;