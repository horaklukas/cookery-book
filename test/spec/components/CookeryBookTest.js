'use strict';

describe('CookeryBook', function() {
  var React = require('react/addons');
  var CookeryBook, component;

  beforeAll(function() {
    mockery.registerMock('stores/RecipesStore');
    mockery.registerMock('components/Recipe');
    mockery.registerMock('../actions/RecipesActions');
    mockery.enable();
    CookeryBook = require('components/CookeryBook.js');
  });

  beforeEach(function() {
    /*var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    component = React.createElement(CookeryBook);*/
  });

  after(function() {
    mockery.deregisterAll();
    mockery.disable();
  });

  it('should create a new instance of CookeryBook', function() {
    //expect(component).toBeDefined();
    expect(true).toBe(false);
  });
});
