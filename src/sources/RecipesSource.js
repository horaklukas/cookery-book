'use strict';

import {fromJS} from 'immutable';
import recipes from '../recipes';

var RecipesSource = {
  fetch: function () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(fromJS(recipes));
      }, 250);
    });
  }
};

export default RecipesSource;